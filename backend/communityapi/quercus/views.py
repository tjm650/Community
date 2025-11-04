from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views import View
import json
import logging
from datetime import datetime, timedelta
from django.db import transaction
from django.core.paginator import Paginator

# Import Gemini AI
try:
    import google.generativeai as genai
    GEMINI_AVAILABLE = True
except ImportError:
    GEMINI_AVAILABLE = False

from .models import (
    QuercusConversation,
    QuercusMessage,
    QuercusSettings,
    QuercusPrompt,
    QuercusAnalytics,
    QuercusCampusResource,
    QuercusStudyPlan,
    QuercusCareerGuidance
)

logger = logging.getLogger(__name__)

class QuercusAIView(View):
    """Main AI assistant view for campus queries"""

    @method_decorator(csrf_exempt)
    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def post(self, request):
        try:
            data = json.loads(request.body)
            prompt = data.get('prompt', '')
            context = data.get('context', 'campus_assistant')
            conversation_id = data.get('conversation_id')

            if not prompt:
                return JsonResponse({
                    'error': 'Prompt is required',
                    'success': False
                }, status=400)

            user = request.user

            # Get or create conversation
            if conversation_id:
                try:
                    conversation = QuercusConversation.objects.get(
                        conversation_id=conversation_id,
                        user=user
                    )
                except QuercusConversation.DoesNotExist:
                    conversation = self._create_conversation(user, conversation_id)
            else:
                conversation = self._create_conversation(user)

            # Get conversation history for context
            conversation_history = self._get_conversation_history(conversation)

            # Generate AI response with enhanced context
            ai_response = self._generate_ai_response(prompt, context, user, conversation_history=conversation_history)

            # Save user message
            user_message = QuercusMessage.objects.create(
                conversation=conversation,
                message_id=f"user_{datetime.now().timestamp()}",
                content=prompt,
                is_user=True,
                metadata={'type': 'user_query'}
            )

            # Save AI response
            ai_message = QuercusMessage.objects.create(
                conversation=conversation,
                message_id=f"ai_{datetime.now().timestamp()}",
                content=ai_response,
                is_user=False,
                metadata={
                    'type': 'ai_response',
                    'context': context,
                    'model': 'gemini-pro'
                }
            )

            # Update conversation title if it's new
            if not conversation.title:
                conversation.title = self._generate_conversation_title(prompt)
                conversation.save()

            # Update analytics
            self._update_analytics(user, context)

            return JsonResponse({
                'success': True,
                'response': ai_response,
                'conversation_id': conversation.conversation_id,
                'message_id': ai_message.message_id,
                'timestamp': ai_message.timestamp.isoformat(),
                'metadata': {
                    'context': context,
                    'tokens_used': len(ai_response.split()) * 1.3,  # Rough estimate
                }
            })

        except Exception as e:
            logger.error(f"Quercus AI error: {str(e)}")
            return JsonResponse({
                'success': False,
                'error': 'Internal server error',
                'message': str(e)
            }, status=500)

    def _create_conversation(self, user, conversation_id=None):
        """Create a new conversation"""
        if not conversation_id:
            conversation_id = f"conv_{user.id}_{datetime.now().timestamp()}"

        return QuercusConversation.objects.create(
            user=user,
            conversation_id=conversation_id,
            title=""
        )

    def _generate_ai_response(self, prompt, context, user, image_data=None, conversation_history=None):
        """Generate AI response using Gemini with enhanced features"""
        if not GEMINI_AVAILABLE:
            return self._get_fallback_response(prompt, context)

        try:
            # Configure Gemini
            api_key = getattr(settings, 'GEMINI_API_KEY', None)
            if not api_key:
                return self._get_fallback_response(prompt, context)

            genai.configure(api_key=api_key)

            # Choose model based on context and features
            if image_data:
                model = genai.GenerativeModel('gemini-1.5-pro')  # Gemini 1.5 Pro supports vision
            else:
                model = genai.GenerativeModel('gemini-1.5-pro')

            # Create enhanced campus-specific prompt with conversation history
            full_prompt = self._build_enhanced_campus_prompt(prompt, context, user, conversation_history)

            # Prepare generation config
            generation_config = genai.types.GenerationConfig(
                temperature=0.7,
                top_k=40,
                top_p=0.95,
                max_output_tokens=2048,
            )

            # Handle image analysis if image data is provided
            if image_data:
                response = model.generate_content(
                    [full_prompt, image_data],
                    generation_config=generation_config
                )
            else:
                response = model.generate_content(
                    full_prompt,
                    generation_config=generation_config
                )

            return response.text if response else self._get_fallback_response(prompt, context)

        except Exception as e:
            logger.error(f"Gemini API error: {str(e)}")
            return self._get_fallback_response(prompt, context)

    def _build_enhanced_campus_prompt(self, prompt, context, user, conversation_history=None):
        """Build an enhanced campus-specific prompt for Gemini with context awareness"""

        # Get user preferences
        user_settings = QuercusSettings.objects.filter(user=user).first()
        response_style = user_settings.response_style if user_settings else 'concise'

        # Build conversation context
        conversation_context = ""
        if conversation_history and len(conversation_history) > 0:
            recent_messages = conversation_history[-6:]  # Last 6 messages for context
            conversation_context = "\nRecent conversation context:\n"
            for msg in recent_messages:
                role = "User" if msg.get('is_user', False) else "Assistant"
                conversation_context += f"{role}: {msg.get('content', '')}\n"

        # Context-specific instructions
        context_instructions = self._get_context_instructions(context)

        # Response style adjustments
        style_instructions = self._get_style_instructions(response_style)

        base_prompt = f"""
        You are Quercus, an intelligent campus companion AI powered by Gemini AI, designed specifically for university students.
        Your expertise includes: academic support, campus life, scheduling, research assistance, career guidance, and study strategies.

        USER PROFILE:
        - Name: {user.get_full_name() or user.username}
        - Response Style Preference: {response_style}
        - Context: {context}

        CORE CAPABILITIES:
        • Academic Support: Help with understanding concepts, assignments, exam prep
        • Campus Life: Information about events, resources, facilities, dining
        • Study Planning: Create schedules, organize study time, track progress
        • Research: Assist with finding information, analyzing data, citations
        • Career Guidance: Major selection, internship advice, job search help
        • Personal Development: Time management, productivity, motivation

        {context_instructions}

        {conversation_context}

        CURRENT QUERY: {prompt}

        {style_instructions}

        IMPORTANT GUIDELINES:
        • Be encouraging and supportive - students often need motivation
        • Provide actionable advice with specific steps when possible
        • If you don't know something, admit it and suggest where to find the information
        • Use campus-appropriate language and examples
        • Keep responses focused and relevant to student life
        • When discussing academic topics, explain concepts clearly
        • For scheduling help, consider student constraints (classes, deadlines, etc.)

        RESPONSE FORMAT:
        • Start with a brief, empathetic acknowledgment
        • Provide clear, structured information
        • End with a question or suggestion to continue the conversation
        • Use bullet points or numbered lists for clarity when appropriate

        Response:
        """

        return base_prompt.strip()

    def _get_context_instructions(self, context):
        """Get context-specific instructions"""
        context_map = {
            'study': """
            FOCUS: Academic Support & Learning
            • Help break down complex topics into understandable parts
            • Suggest study techniques and memory strategies
            • Recommend resources and practice materials
            • Explain difficult concepts with examples
            • Provide exam preparation strategies
            """,

            'schedule': """
            FOCUS: Time Management & Planning
            • Create realistic study schedules considering class times
            • Help balance academic work with personal life
            • Suggest productivity techniques (Pomodoro, time-blocking)
            • Plan for assignment deadlines and exam periods
            • Include breaks and self-care in schedules
            """,

            'campus': """
            FOCUS: Campus Life & Resources
            • Provide accurate information about campus facilities
            • Share details about events, clubs, and activities
            • Help locate study spots, dining, and services
            • Connect students with relevant campus resources
            • Stay updated on campus news and announcements
            """,

            'career': """
            FOCUS: Career Development & Planning
            • Discuss major selection and career paths
            • Provide resume and interview guidance
            • Share internship and job search strategies
            • Help develop professional skills
            • Connect academic work to career goals
            """,

            'research': """
            FOCUS: Research & Academic Writing
            • Help with research methodology and design
            • Assist in finding credible sources
            • Guide citation and referencing
            • Support data analysis and interpretation
            • Help structure academic papers and reports
            """
        }

        return context_map.get(context, context_map.get('study'))

    def _get_style_instructions(self, response_style):
        """Get style-specific instructions"""
        style_map = {
            'concise': """
            STYLE: Keep responses brief and to-the-point
            • Focus on essential information only
            • Use short paragraphs and bullet points
            • Avoid unnecessary elaboration
            • Get straight to actionable advice
            """,

            'detailed': """
            STYLE: Provide comprehensive, thorough responses
            • Include background information and context
            • Explain concepts in depth with examples
            • Offer multiple perspectives when relevant
            • Provide extensive actionable steps
            """,

            'conversational': """
            STYLE: Friendly, engaging, and conversational tone
            • Use a warm, approachable voice
            • Ask questions to engage the user
            • Share relatable examples and anecdotes
            • Make the response feel like talking to a helpful peer
            """
        }

        return style_map.get(response_style, style_map.get('concise'))

    def _get_conversation_history(self, conversation):
        """Get recent conversation history for context"""
        if not conversation:
            return []

        messages = conversation.messages.order_by('timestamp').values(
            'content', 'is_user', 'timestamp'
        )[:10]  # Last 10 messages

        return [
            {
                'content': msg['content'],
                'is_user': msg['is_user'],
                'timestamp': msg['timestamp'].isoformat()
            }
            for msg in messages
        ]

    def _get_fallback_response(self, prompt, context):
        """Fallback responses when Gemini is not available"""
        responses = {
            'study': "For your study question, I recommend:\n\n• Breaking down complex topics into smaller sections\n• Using active recall techniques\n• Joining study groups\n• Utilizing campus tutoring services\n• Taking regular breaks\n\nWould you like more specific study strategies?",
            'schedule': "I can help you create an effective study schedule! Consider:\n\n• Allocating specific time blocks for each subject\n• Including buffer time for unexpected tasks\n• Scheduling regular review sessions\n• Balancing academic work with personal time\n\nWould you like help creating a personalized schedule?",
            'campus': "For campus information, I suggest:\n\n• Checking the student portal for updates\n• Following campus social media accounts\n• Joining relevant student organizations\n• Attending academic department events\n\nWould you like recommendations for specific campus resources?",
            'career': "For career guidance, consider:\n\n• Exploring internship opportunities\n• Building a strong resume\n• Networking with alumni\n• Developing relevant skills\n\nWould you like specific career advice for your field?",
        }

        prompt_lower = prompt.lower()
        if 'study' in prompt_lower or 'exam' in prompt_lower:
            return responses['study']
        elif 'schedule' in prompt_lower or 'time' in prompt_lower:
            return responses['schedule']
        elif 'campus' in prompt_lower or 'event' in prompt_lower:
            return responses['campus']
        elif 'career' in prompt_lower or 'job' in prompt_lower:
            return responses['career']
        else:
            return "I'm here to help with your campus-related questions! I can assist with:\n\n• Study tips and academic resources\n• Campus event information\n• Schedule planning and organization\n• Research assistance\n• Career guidance\n\nPlease provide more specific details about what you need help with!"

    def _generate_conversation_title(self, prompt):
        """Generate a title for the conversation"""
        words = prompt.split()[:6]  # First 6 words
        return ' '.join(words) + ('...' if len(prompt.split()) > 6 else '')

    def _update_analytics(self, user, context):
        """Update user analytics"""
        today = datetime.now().date()

        analytics, created = QuercusAnalytics.objects.get_or_create(
            user=user,
            date=today,
            defaults={'total_queries': 0}
        )

        analytics.total_queries += 1

        # Update context-specific counters
        if 'study' in context:
            analytics.study_queries += 1
        elif 'schedule' in context:
            analytics.schedule_queries += 1
        elif 'campus' in context:
            analytics.campus_queries += 1
        elif 'career' in context:
            analytics.career_queries += 1

        analytics.save()

class QuercusConversationView(View):
    """View for managing conversations"""

    @method_decorator(csrf_exempt)
    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def get(self, request):
        """Get user's conversations"""
        try:
            conversations = QuercusConversation.objects.filter(
                user=request.user,
                is_active=True
            ).order_by('-updated_at')[:50]

            conversation_data = []
            for conv in conversations:
                # Get last message preview
                last_message = conv.messages.last()
                preview = last_message.content[:100] + '...' if last_message and len(last_message.content) > 100 else (last_message.content if last_message else '')

                conversation_data.append({
                    'id': conv.id,
                    'conversation_id': conv.conversation_id,
                    'title': conv.title or 'New Conversation',
                    'preview': preview,
                    'created_at': conv.created_at.isoformat(),
                    'updated_at': conv.updated_at.isoformat(),
                    'message_count': conv.messages.count(),
                })

            return JsonResponse({
                'success': True,
                'conversations': conversation_data
            })

        except Exception as e:
            logger.error(f"Get conversations error: {str(e)}")
            return JsonResponse({
                'success': False,
                'error': str(e)
            }, status=500)

    def post(self, request):
        """Create new conversation"""
        try:
            data = json.loads(request.body)
            title = data.get('title', '')

            conversation = QuercusConversation.objects.create(
                user=request.user,
                conversation_id=f"conv_{request.user.id}_{datetime.now().timestamp()}",
                title=title
            )

            return JsonResponse({
                'success': True,
                'conversation_id': conversation.conversation_id,
                'conversation': {
                    'id': conversation.id,
                    'conversation_id': conversation.conversation_id,
                    'title': conversation.title,
                    'created_at': conversation.created_at.isoformat(),
                }
            })

        except Exception as e:
            logger.error(f"Create conversation error: {str(e)}")
            return JsonResponse({
                'success': False,
                'error': str(e)
            }, status=500)

class QuercusSettingsView(View):
    """View for managing AI settings"""

    @method_decorator(csrf_exempt)
    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def get(self, request):
        """Get user AI settings"""
        try:
            settings, created = QuercusSettings.objects.get_or_create(
                user=request.user,
                defaults={
                    'response_style': 'concise',
                    'auto_save': True,
                    'notifications_enabled': True,
                }
            )

            return JsonResponse({
                'success': True,
                'settings': {
                    'response_style': settings.response_style,
                    'auto_save': settings.auto_save,
                    'notifications_enabled': settings.notifications_enabled,
                    'study_reminders': settings.study_reminders,
                    'campus_updates': settings.campus_updates,
                }
            })

        except Exception as e:
            logger.error(f"Get settings error: {str(e)}")
            return JsonResponse({
                'success': False,
                'error': str(e)
            }, status=500)

    def post(self, request):
        """Update user AI settings"""
        try:
            data = json.loads(request.body)
            settings_data = data.get('settings', {})

            settings, created = QuercusSettings.objects.get_or_create(
                user=request.user,
                defaults={
                    'response_style': 'concise',
                    'auto_save': True,
                    'notifications_enabled': True,
                }
            )

            # Update settings
            for key, value in settings_data.items():
                if hasattr(settings, key):
                    setattr(settings, key, value)

            settings.save()

            return JsonResponse({
                'success': True,
                'message': 'Settings updated successfully'
            })

        except Exception as e:
            logger.error(f"Update settings error: {str(e)}")
            return JsonResponse({
                'success': False,
                'error': str(e)
            }, status=500)

class QuercusCampusInfoView(View):
    """View for campus-specific information"""

    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def get(self, request):
        """Get campus information"""
        try:
            info_type = request.GET.get('type', '')
            query = request.GET.get('query', '')

            if info_type == 'study_spots':
                resources = QuercusCampusResource.objects.filter(
                    resource_type='study_spot',
                    is_active=True
                ).values('name', 'description', 'location', 'building')
            elif info_type == 'dining':
                resources = QuercusCampusResource.objects.filter(
                    resource_type='dining',
                    is_active=True
                ).values('name', 'description', 'location', 'operating_hours')
            elif info_type == 'events':
                # This would typically come from an events system
                resources = []
            else:
                resources = QuercusCampusResource.objects.filter(
                    is_active=True
                ).values('name', 'description', 'resource_type', 'location')[:20]

            return JsonResponse({
                'success': True,
                'info': {
                    'type': info_type,
                    'query': query,
                    'resources': list(resources),
                    'total_count': len(resources)
                }
            })

        except Exception as e:
            logger.error(f"Get campus info error: {str(e)}")
            return JsonResponse({
                'success': False,
                'error': str(e)
            }, status=500)

class QuercusStudyPlanView(View):
    """View for generating study plans"""

    @method_decorator(csrf_exempt)
    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def post(self, request):
        """Generate study plan"""
        try:
            data = json.loads(request.body)
            subject = data.get('subject', '')
            duration = data.get('duration', 4)  # weeks
            difficulty = data.get('difficulty', 'intermediate')

            if not subject:
                return JsonResponse({
                    'error': 'Subject is required',
                    'success': False
                }, status=400)

            # Generate study plan using AI
            study_plan = self._generate_study_plan(subject, duration, difficulty)

            # Save study plan
            saved_plan = QuercusStudyPlan.objects.create(
                user=request.user,
                subject=subject,
                duration_weeks=duration,
                difficulty_level=difficulty,
                plan_data=study_plan
            )

            return JsonResponse({
                'success': True,
                'study_plan': study_plan,
                'plan_id': saved_plan.id
            })

        except Exception as e:
            logger.error(f"Generate study plan error: {str(e)}")
            return JsonResponse({
                'success': False,
                'error': str(e)
            }, status=500)

    def _generate_study_plan(self, subject, duration, difficulty):
        """Generate a structured study plan"""
        if not GEMINI_AVAILABLE:
            return self._get_basic_study_plan(subject, duration, difficulty)

        try:
            api_key = getattr(settings, 'GEMINI_API_KEY', None)
            if not api_key:
                return self._get_basic_study_plan(subject, duration, difficulty)

            genai.configure(api_key=api_key)
            model = genai.GenerativeModel('gemini-pro')

            prompt = f"""
            Create a detailed {duration}-week study plan for {subject}.
            Difficulty level: {difficulty}.
            Include daily tasks, weekly milestones, and recommended resources.
            Format as JSON with this structure:
            {{
                "weeks": [
                    {{
                        "week": 1,
                        "focus": "topic",
                        "daily_tasks": ["task1", "task2"],
                        "milestone": "goal"
                    }}
                ],
                "resources": ["resource1", "resource2"],
                "tips": ["tip1", "tip2"]
            }}
            """

            response = model.generate_content(prompt)
            return json.loads(response.text) if response else self._get_basic_study_plan(subject, duration, difficulty)

        except Exception as e:
            logger.error(f"Study plan generation error: {str(e)}")
            return self._get_basic_study_plan(subject, duration, difficulty)

    def _get_basic_study_plan(self, subject, duration, difficulty):
        """Basic study plan when AI is not available"""
        return {
            "weeks": [
                {
                    "week": i + 1,
                    "focus": f"{subject} fundamentals",
                    "daily_tasks": [
                        f"Study {subject} concepts for 1-2 hours",
                        "Practice problems and exercises",
                        "Review notes and key points",
                        "Take short quiz to test understanding"
                    ],
                    "milestone": f"Complete {subject} module {i + 1}"
                } for i in range(duration)
            ],
            "resources": [
                f"Textbook chapters on {subject}",
                "Online tutorials and videos",
                "Practice problems and exercises",
                "Study group sessions"
            ],
            "tips": [
                "Break down complex topics into smaller sections",
                "Use active recall techniques",
                "Take regular breaks",
                "Join or form study groups"
            ]
        }

class QuercusCareerGuidanceView(View):
    """View for career guidance"""

    @method_decorator(csrf_exempt)
    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def post(self, request):
        """Generate career guidance"""
        try:
            data = json.loads(request.body)
            field = data.get('field', '')
            interests = data.get('interests', '')

            if not field:
                return JsonResponse({
                    'error': 'Field of study is required',
                    'success': False
                }, status=400)

            # Generate career guidance
            guidance = self._generate_career_guidance(field, interests)

            # Save guidance
            saved_guidance = QuercusCareerGuidance.objects.create(
                user=request.user,
                field_of_study=field,
                interests=interests,
                guidance_data=guidance
            )

            return JsonResponse({
                'success': True,
                'guidance': guidance,
                'guidance_id': saved_guidance.id
            })

        except Exception as e:
            logger.error(f"Generate career guidance error: {str(e)}")
            return JsonResponse({
                'success': False,
                'error': str(e)
            }, status=500)

    def _generate_career_guidance(self, field, interests):
        """Generate career guidance"""
        if not GEMINI_AVAILABLE:
            return self._get_basic_career_guidance(field, interests)

        try:
            api_key = getattr(settings, 'GEMINI_API_KEY', None)
            if not api_key:
                return self._get_basic_career_guidance(field, interests)

            genai.configure(api_key=api_key)
            model = genai.GenerativeModel('gemini-pro')

            prompt = f"""
            Provide comprehensive career guidance for someone studying {field}
            with interests in {interests}.

            Include:
            1. Potential career paths
            2. Required skills and qualifications
            3. Job market outlook
            4. Next steps and recommendations
            5. Relevant industries

            Format as structured JSON.
            """

            response = model.generate_content(prompt)
            return json.loads(response.text) if response else self._get_basic_career_guidance(field, interests)

        except Exception as e:
            logger.error(f"Career guidance generation error: {str(e)}")
            return self._get_basic_career_guidance(field, interests)

    def _get_basic_career_guidance(self, field, interests):
        """Basic career guidance when AI is not available"""
        return {
            "career_paths": [
                f"{field} Specialist",
                f"{field} Consultant",
                f"{field} Researcher",
                f"{field} Educator"
            ],
            "required_skills": [
                f"Deep knowledge in {field}",
                "Problem-solving abilities",
                "Communication skills",
                "Project management",
                "Technical proficiency"
            ],
            "job_outlook": "Positive growth expected in related industries",
            "next_steps": [
                "Build a strong portfolio",
                "Gain practical experience through internships",
                "Network with professionals in the field",
                "Consider advanced certifications",
                "Stay updated with industry trends"
            ],
            "industries": [
                "Technology",
                "Education",
                "Research",
                "Consulting",
                "Healthcare" if "health" in field.lower() else "Finance"
            ]
        }

class QuercusConversationSummaryView(View):
    """View for generating conversation summaries and insights"""

    @method_decorator(csrf_exempt)
    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def get(self, request, conversation_id):
        """Get conversation summary and insights"""
        try:
            # Get conversation
            conversation = QuercusConversation.objects.get(
                conversation_id=conversation_id,
                user=request.user,
                is_active=True
            )

            # Get conversation messages
            messages = conversation.messages.order_by('timestamp').values(
                'content', 'is_user', 'timestamp', 'metadata'
            )

            if not messages:
                return JsonResponse({
                    'success': True,
                    'summary': {
                        'conversation_id': conversation_id,
                        'title': conversation.title or 'New Conversation',
                        'message_count': 0,
                        'summary': 'No messages in this conversation yet.',
                        'insights': [],
                        'key_topics': [],
                        'action_items': []
                    }
                })

            # Generate summary using AI
            summary_data = self._generate_conversation_summary(messages, conversation)

            return JsonResponse({
                'success': True,
                'summary': summary_data
            })

        except QuercusConversation.DoesNotExist:
            return JsonResponse({
                'success': False,
                'error': 'Conversation not found'
            }, status=404)
        except Exception as e:
            logger.error(f"Conversation summary error: {str(e)}")
            return JsonResponse({
                'success': False,
                'error': str(e)
            }, status=500)

    def _generate_conversation_summary(self, messages, conversation):
        """Generate conversation summary using AI"""
        if not GEMINI_AVAILABLE:
            return self._get_basic_conversation_summary(messages, conversation)

        try:
            api_key = getattr(settings, 'GEMINI_API_KEY', None)
            if not api_key:
                return self._get_basic_conversation_summary(messages, conversation)

            genai.configure(api_key=api_key)
            model = genai.GenerativeModel('gemini-pro')

            # Prepare conversation text
            conversation_text = ""
            for msg in messages:
                role = "User" if msg['is_user'] else "Quercus AI"
                conversation_text += f"{role}: {msg['content']}\n\n"

            prompt = f"""
            Please analyze this conversation between a student and Quercus AI assistant.
            Provide a comprehensive summary with insights and actionable items.

            Conversation:
            {conversation_text}

            Please provide:
            1. A brief overall summary (2-3 sentences)
            2. Key topics discussed (3-5 main themes)
            3. Main insights or learning points
            4. Action items or next steps mentioned
            5. Overall sentiment and helpfulness assessment

            Format as JSON with this structure:
            {{
                "overall_summary": "Brief summary here",
                "key_topics": ["topic1", "topic2", "topic3"],
                "insights": ["insight1", "insight2"],
                "action_items": ["item1", "item2"],
                "sentiment": "positive/neutral/negative",
                "helpfulness_score": 8
            }}
            """

            response = model.generate_content(prompt)
            summary_data = json.loads(response.text) if response else {}

            # Add basic conversation info
            summary_data.update({
                'conversation_id': conversation.conversation_id,
                'title': conversation.title or 'Untitled Conversation',
                'message_count': len(messages),
                'created_at': conversation.created_at.isoformat(),
                'last_activity': conversation.updated_at.isoformat()
            })

            return summary_data

        except Exception as e:
            logger.error(f"Conversation summary generation error: {str(e)}")
            return self._get_basic_conversation_summary(messages, conversation)

    def _get_basic_conversation_summary(self, messages, conversation):
        """Basic conversation summary when AI is not available"""
        # Simple analysis of conversation
        user_messages = [msg for msg in messages if msg['is_user']]
        ai_messages = [msg for msg in messages if not msg['is_user']]

        # Extract key topics (simple keyword analysis)
        all_text = ' '.join([msg['content'] for msg in messages])
        words = all_text.lower().split()
        common_words = ['study', 'help', 'question', 'need', 'want', 'think', 'know', 'like']

        key_topics = []
        for word in common_words:
            if word in words:
                key_topics.append(word.capitalize())

        return {
            'conversation_id': conversation.conversation_id,
            'title': conversation.title or 'Untitled Conversation',
            'message_count': len(messages),
            'created_at': conversation.created_at.isoformat(),
            'last_activity': conversation.updated_at.isoformat(),
            'overall_summary': f"This conversation contains {len(messages)} messages with {len(user_messages)} questions and {len(ai_messages)} AI responses.",
            'key_topics': key_topics[:5] or ['General Discussion'],
            'insights': ['Conversation analysis provides valuable learning insights'],
            'action_items': ['Continue exploring topics of interest'],
            'sentiment': 'neutral',
            'helpfulness_score': 7
        }

class QuercusDocumentAnalysisView(View):
    """View for analyzing documents using Gemini"""

    @method_decorator(csrf_exempt)
    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def post(self, request):
        """Analyze document using Gemini"""
        try:
            data = json.loads(request.body)
            document_data = data.get('document_data', '')
            document_type = data.get('document_type', 'text')
            prompt = data.get('prompt', 'Analyze this document and provide insights')
            context = data.get('context', 'document_analysis')
            conversation_id = data.get('conversation_id')

            if not document_data:
                return JsonResponse({
                    'error': 'Document data is required',
                    'success': False
                }, status=400)

            user = request.user

            # Get or create conversation
            if conversation_id:
                try:
                    conversation = QuercusConversation.objects.get(
                        conversation_id=conversation_id,
                        user=user
                    )
                except QuercusConversation.DoesNotExist:
                    conversation = self._create_conversation(user, conversation_id)
            else:
                conversation = self._create_conversation(user)

            # Generate document analysis response
            ai_response = self._analyze_document(document_data, document_type, prompt, context, user)

            # Save user message with document reference
            user_message = QuercusMessage.objects.create(
                conversation=conversation,
                message_id=f"user_doc_{datetime.now().timestamp()}",
                content=f"[Document Analysis Request] {prompt}",
                is_user=True,
                metadata={
                    'type': 'document_analysis_request',
                    'document_type': document_type,
                    'prompt': prompt
                }
            )

            # Save AI response
            ai_message = QuercusMessage.objects.create(
                conversation=conversation,
                message_id=f"ai_doc_{datetime.now().timestamp()}",
                content=ai_response,
                is_user=False,
                metadata={
                    'type': 'document_analysis_response',
                    'context': context,
                    'model': 'gemini-pro',
                    'document_type': document_type
                }
            )

            # Update conversation title if it's new
            if not conversation.title:
                conversation.title = f"Document Analysis Session"
                conversation.save()

            # Update analytics
            self._update_analytics(user, context)

            return JsonResponse({
                'success': True,
                'response': ai_response,
                'conversation_id': conversation.conversation_id,
                'message_id': ai_message.message_id,
                'timestamp': ai_message.timestamp.isoformat(),
                'metadata': {
                    'context': context,
                    'analysis_type': 'document_analysis',
                    'document_type': document_type,
                    'model': 'gemini-1.5-pro'
                }
            })

        except Exception as e:
            logger.error(f"Document analysis error: {str(e)}")
            return JsonResponse({
                'success': False,
                'error': 'Internal server error',
                'message': str(e)
            }, status=500)

    def _analyze_document(self, document_data, document_type, prompt, context, user):
        """Analyze document using Gemini"""
        if not GEMINI_AVAILABLE:
            return "Document analysis is currently unavailable. Please try again later."

        try:
            api_key = getattr(settings, 'GEMINI_API_KEY', None)
            if not api_key:
                return "Document analysis configuration error. Please contact support."

            genai.configure(api_key=api_key)
            model = genai.GenerativeModel('gemini-pro')

            # Create analysis prompt based on document type
            full_prompt = self._build_document_analysis_prompt(
                document_data, document_type, prompt, context, user
            )

            response = model.generate_content(full_prompt)

            return response.text if response else "I couldn't analyze this document. Please try again."

        except Exception as e:
            logger.error(f"Gemini Document API error: {str(e)}")
            return "I encountered an error while analyzing this document. Please try again."

    def _build_document_analysis_prompt(self, document_data, document_type, prompt, context, user):
        """Build prompt for document analysis"""
        # Truncate document data if too long for context window
        max_length = 6000  # Leave room for prompt
        if len(document_data) > max_length:
            document_data = document_data[:max_length] + "... [document truncated]"

        base_prompt = f"""
        You are analyzing a document as Quercus, the campus AI assistant.

        User: {user.get_full_name() or user.username}
        Document Type: {document_type}
        Context: {context}
        Analysis Request: {prompt}

        Document Content:
        {document_data}

        Please provide helpful, educational insights about this document.
        If it's academic content, explain concepts clearly and suggest study strategies.
        If it's research material, highlight key findings and methodologies.
        If it's a study guide, identify important topics and create practice questions.
        Be encouraging and helpful in your analysis.

        Structure your response:
        1. Brief summary of the document
        2. Key points or findings
        3. Analysis and insights
        4. Recommendations or next steps

        Response:
        """

        return base_prompt.strip()

    def _create_conversation(self, user, conversation_id=None):
        """Create a new conversation"""
        if not conversation_id:
            conversation_id = f"doc_conv_{user.id}_{datetime.now().timestamp()}"

        return QuercusConversation.objects.create(
            user=user,
            conversation_id=conversation_id,
            title=""
        )

    def _update_analytics(self, user, context):
        """Update user analytics"""
        today = datetime.now().date()

        analytics, created = QuercusAnalytics.objects.get_or_create(
            user=user,
            date=today,
            defaults={'total_queries': 0}
        )

        analytics.total_queries += 1

        # Update context-specific counters
        if 'document' in context:
            analytics.study_queries += 1  # Using study_queries for document analysis

        analytics.save()

class QuercusConversationInsightsView(View):
    """View for generating advanced conversation insights"""

    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def get(self, request, conversation_id):
        """Get detailed conversation insights"""
        try:
            # Get conversation
            conversation = QuercusConversation.objects.get(
                conversation_id=conversation_id,
                user=request.user,
                is_active=True
            )

            # Get conversation messages
            messages = list(conversation.messages.order_by('timestamp').values(
                'content', 'is_user', 'timestamp', 'metadata'
            ))

            if not messages:
                return JsonResponse({
                    'success': True,
                    'insights': {
                        'conversation_id': conversation_id,
                        'message_count': 0,
                        'insights': 'No messages to analyze yet.'
                    }
                })

            # Generate comprehensive insights
            insights_data = self._generate_conversation_insights(messages, conversation)

            return JsonResponse({
                'success': True,
                'insights': insights_data
            })

        except QuercusConversation.DoesNotExist:
            return JsonResponse({
                'success': False,
                'error': 'Conversation not found'
            }, status=404)
        except Exception as e:
            logger.error(f"Conversation insights error: {str(e)}")
            return JsonResponse({
                'success': False,
                'error': str(e)
            }, status=500)

    def _generate_conversation_insights(self, messages, conversation):
        """Generate comprehensive conversation insights"""
        if not GEMINI_AVAILABLE:
            return self._get_basic_conversation_insights(messages, conversation)

        try:
            api_key = getattr(settings, 'GEMINI_API_KEY', None)
            if not api_key:
                return self._get_basic_conversation_insights(messages, conversation)

            genai.configure(api_key=api_key)
            model = genai.GenerativeModel('gemini-pro')

            # Prepare conversation for analysis
            conversation_text = ""
            for msg in messages:
                role = "User" if msg['is_user'] else "Quercus AI"
                conversation_text += f"{role}: {msg['content']}\n\n"

            prompt = f"""
            Analyze this student-AI conversation and provide detailed insights for learning improvement.

            Conversation:
            {conversation_text}

            Provide comprehensive analysis in JSON format:
            {{
                "learning_progression": "How the student's understanding evolved",
                "knowledge_gaps": ["identified gaps or misconceptions"],
                "study_patterns": ["observed learning patterns"],
                "question_quality": "assessment of question depth and clarity",
                "engagement_level": "how engaged the student appears",
                "suggested_improvements": ["ways to improve learning"],
                "key_learning_moments": ["important insights gained"],
                "recommended_resources": ["suggested next steps"],
                "confidence_indicators": ["signs of growing confidence"],
                "areas_for_focus": ["topics needing more attention"]
            }}
            """

            response = model.generate_content(prompt)
            insights_data = json.loads(response.text) if response else {}

            # Add basic metrics
            insights_data.update({
                'conversation_id': conversation.conversation_id,
                'title': conversation.title or 'Untitled Conversation',
                'message_count': len(messages),
                'user_messages': len([m for m in messages if m['is_user']]),
                'ai_messages': len([m for m in messages if not m['is_user']]),
                'duration': self._calculate_conversation_duration(messages),
                'avg_response_length': self._calculate_avg_response_length(messages)
            })

            return insights_data

        except Exception as e:
            logger.error(f"Conversation insights generation error: {str(e)}")
            return self._get_basic_conversation_insights(messages, conversation)

    def _get_basic_conversation_insights(self, messages, conversation):
        """Basic conversation insights when AI is not available"""
        user_messages = [msg for msg in messages if msg['is_user']]
        ai_messages = [msg for msg in messages if not msg['is_user']]

        # Simple analysis
        total_length = sum(len(msg['content']) for msg in messages)
        avg_length = total_length // len(messages) if messages else 0

        return {
            'conversation_id': conversation.conversation_id,
            'title': conversation.title or 'Untitled Conversation',
            'message_count': len(messages),
            'user_messages': len(user_messages),
            'ai_messages': len(ai_messages),
            'duration': self._calculate_conversation_duration(messages),
            'avg_response_length': avg_length,
            'learning_progression': 'Basic conversation analysis shows active engagement.',
            'knowledge_gaps': ['Further analysis needed for detailed insights'],
            'study_patterns': ['Regular interaction suggests consistent learning approach'],
            'question_quality': 'Questions show engagement with the material',
            'engagement_level': 'Active participation in conversation',
            'suggested_improvements': ['Continue asking questions', 'Explore related topics'],
            'key_learning_moments': ['Active learning through questioning'],
            'recommended_resources': ['Continue using AI for learning support'],
            'confidence_indicators': ['Willingness to ask questions shows learning mindset'],
            'areas_for_focus': ['Continue current learning approach']
        }

    def _calculate_conversation_duration(self, messages):
        """Calculate conversation duration in minutes"""
        if len(messages) < 2:
            return 0

        timestamps = [msg['timestamp'] for msg in messages]
        start_time = min(timestamps)
        end_time = max(timestamps)

        duration_seconds = (end_time - start_time).total_seconds()
        return round(duration_seconds / 60, 1)

    def _calculate_avg_response_length(self, messages):
        """Calculate average response length"""
        if not messages:
            return 0

        total_chars = sum(len(msg['content']) for msg in messages)
        return total_chars // len(messages)

class QuercusConversationExportView(View):
    """View for exporting conversations"""

    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def post(self, request):
        """Export conversations"""
        try:
            data = json.loads(request.body)
            conversation_ids = data.get('conversation_ids', [])
            export_format = data.get('format', 'json')  # json, txt, pdf

            if not conversation_ids:
                return JsonResponse({
                    'error': 'Conversation IDs are required',
                    'success': False
                }, status=400)

            user = request.user
            exported_data = []

            for conv_id in conversation_ids:
                try:
                    conversation = QuercusConversation.objects.get(
                        conversation_id=conv_id,
                        user=user,
                        is_active=True
                    )

                    messages = conversation.messages.order_by('timestamp').values(
                        'content', 'is_user', 'timestamp', 'metadata'
                    )

                    conversation_data = {
                        'conversation_id': conversation.conversation_id,
                        'title': conversation.title or 'Untitled Conversation',
                        'created_at': conversation.created_at.isoformat(),
                        'updated_at': conversation.updated_at.isoformat(),
                        'messages': [
                            {
                                'content': msg['content'],
                                'is_user': msg['is_user'],
                                'timestamp': msg['timestamp'].isoformat(),
                                'metadata': msg['metadata']
                            }
                            for msg in messages
                        ]
                    }

                    exported_data.append(conversation_data)

                except QuercusConversation.DoesNotExist:
                    continue

            if not exported_data:
                return JsonResponse({
                    'success': False,
                    'error': 'No valid conversations found'
                }, status=404)

            # Format export data based on requested format
            if export_format == 'txt':
                export_content = self._format_as_text(exported_data)
                filename = f"quercus_conversations_{datetime.now().strftime('%Y%m%d_%H%M%S')}.txt"
            else:  # json
                export_content = json.dumps(exported_data, indent=2, ensure_ascii=False)
                filename = f"quercus_conversations_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"

            return JsonResponse({
                'success': True,
                'export_data': export_content,
                'filename': filename,
                'format': export_format,
                'conversation_count': len(exported_data)
            })

        except Exception as e:
            logger.error(f"Conversation export error: {str(e)}")
            return JsonResponse({
                'success': False,
                'error': str(e)
            }, status=500)

    def _format_as_text(self, conversations):
        """Format conversations as plain text"""
        text_content = f"Quercus AI Conversations Export - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n"
        text_content += "=" * 80 + "\n\n"

        for conv in conversations:
            text_content += f"Conversation: {conv['title']}\n"
            text_content += f"ID: {conv['conversation_id']}\n"
            text_content += f"Created: {conv['created_at']}\n"
            text_content += f"Updated: {conv['updated_at']}\n"
            text_content += "-" * 40 + "\n"

            for msg in conv['messages']:
                role = "User" if msg['is_user'] else "Quercus AI"
                timestamp = msg['timestamp']
                text_content += f"[{timestamp}] {role}:\n{msg['content']}\n\n"

            text_content += "=" * 80 + "\n\n"

        return text_content

class QuercusAnalyticsView(View):
    """View for usage analytics and performance monitoring"""

    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def get(self, request):
        """Get user analytics and usage statistics"""
        try:
            user = request.user
            days = int(request.GET.get('days', 30))

            # Get analytics data for the specified period
            end_date = datetime.now().date()
            start_date = end_date - timedelta(days=days)

            analytics_data = QuercusAnalytics.objects.filter(
                user=user,
                date__gte=start_date,
                date__lte=end_date
            ).order_by('date')

            # Calculate summary statistics
            summary = self._calculate_analytics_summary(analytics_data)

            # Get recent conversations
            recent_conversations = QuercusConversation.objects.filter(
                user=user,
                created_at__gte=datetime.now() - timedelta(days=days)
            ).order_by('-updated_at')[:10]

            conversation_stats = []
            for conv in recent_conversations:
                conversation_stats.append({
                    'id': conv.id,
                    'conversation_id': conv.conversation_id,
                    'title': conv.title or 'Untitled',
                    'message_count': conv.messages.count(),
                    'created_at': conv.created_at.isoformat(),
                    'updated_at': conv.updated_at.isoformat()
                })

            return JsonResponse({
                'success': True,
                'analytics': {
                    'period_days': days,
                    'summary': summary,
                    'daily_breakdown': list(analytics_data.values()),
                    'recent_conversations': conversation_stats,
                    'cost_estimate': self._estimate_cost(summary)
                }
            })

        except Exception as e:
            logger.error(f"Analytics error: {str(e)}")
            return JsonResponse({
                'success': False,
                'error': str(e)
            }, status=500)

    def _calculate_analytics_summary(self, analytics_data):
        """Calculate summary statistics from analytics data"""
        if not analytics_data:
            return {
                'total_queries': 0,
                'total_conversations': 0,
                'avg_queries_per_day': 0,
                'most_active_context': 'none',
                'total_study_queries': 0,
                'total_campus_queries': 0,
                'total_career_queries': 0,
                'total_schedule_queries': 0
            }

        total_queries = sum(data.total_queries for data in analytics_data)
        total_study = sum(data.study_queries for data in analytics_data)
        total_campus = sum(data.campus_queries for data in analytics_data)
        total_career = sum(data.career_queries for data in analytics_data)
        total_schedule = sum(data.schedule_queries for data in analytics_data)

        # Find most active context
        context_counts = {
            'study': total_study,
            'campus': total_campus,
            'career': total_career,
            'schedule': total_schedule
        }
        most_active_context = max(context_counts.items(), key=lambda x: x[1])[0]

        return {
            'total_queries': total_queries,
            'total_conversations': QuercusConversation.objects.filter(
                user=analytics_data[0].user
            ).count(),
            'avg_queries_per_day': round(total_queries / len(analytics_data), 1),
            'most_active_context': most_active_context,
            'total_study_queries': total_study,
            'total_campus_queries': total_campus,
            'total_career_queries': total_career,
            'total_schedule_queries': total_schedule
        }

    def _estimate_cost(self, summary):
        """Estimate API costs based on usage"""
        # Rough estimation based on token usage
        # Gemini Pro pricing: approximately $0.0005 per 1K tokens
        estimated_tokens = summary.get('total_queries', 0) * 150  # Rough estimate per query
        estimated_cost = (estimated_tokens / 1000) * 0.0005

        return {
            'estimated_monthly_cost': round(estimated_cost, 4),
            'estimated_tokens': estimated_tokens,
            'note': 'Cost estimation is approximate and based on average usage patterns'
        }

class QuercusSuggestionsView(View):
    """View for AI-powered conversation suggestions"""

    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def get(self, request):
        """Get AI-powered conversation suggestions"""
        try:
            user = request.user
            context = request.GET.get('context', 'general')
            conversation_id = request.GET.get('conversation_id')

            # Get user's conversation history for context
            recent_conversations = QuercusConversation.objects.filter(
                user=user,
                is_active=True
            ).order_by('-updated_at')[:5]

            # Get user's preferences
            user_settings = QuercusSettings.objects.filter(user=user).first()

            # Generate suggestions based on context and history
            suggestions = self._generate_suggestions(
                context, recent_conversations, user_settings, conversation_id
            )

            return JsonResponse({
                'success': True,
                'suggestions': suggestions,
                'context': context
            })

        except Exception as e:
            logger.error(f"Suggestions error: {str(e)}")
            return JsonResponse({
                'success': False,
                'error': str(e)
            }, status=500)

    def _generate_suggestions(self, context, recent_conversations, user_settings, conversation_id):
        """Generate AI-powered suggestions"""
        if not GEMINI_AVAILABLE:
            return self._get_basic_suggestions(context, recent_conversations)

        try:
            api_key = getattr(settings, 'GEMINI_API_KEY', None)
            if not api_key:
                return self._get_basic_suggestions(context, recent_conversations)

            genai.configure(api_key=api_key)
            model = genai.GenerativeModel('gemini-pro')

            # Build context from recent conversations
            conversation_context = ""
            if recent_conversations:
                conversation_context = "Recent conversation topics:\n"
                for conv in recent_conversations:
                    last_message = conv.messages.last()
                    if last_message:
                        preview = last_message.content[:100] + '...' if len(last_message.content) > 100 else last_message.content
                        conversation_context += f"- {conv.title or 'Untitled'}: {preview}\n"

            # Get user preferences
            response_style = user_settings.response_style if user_settings else 'concise'

            prompt = f"""
            You are Quercus, suggesting helpful conversation topics for a university student.

            User Context:
            - Preferred response style: {response_style}
            - Current context: {context}
            {conversation_context}

            Generate 5 specific, actionable conversation suggestions that would be helpful for a university student.
            Each suggestion should be a natural question or topic they might want to discuss.

            Focus on:
            - Academic support and study strategies
            - Campus life and resources
            - Career planning and development
            - Time management and productivity
            - Research and project help

            Format as JSON:
            {{
                "suggestions": [
                    {{
                        "title": "Brief title for the suggestion",
                        "prompt": "The actual question or topic to discuss",
                        "category": "study/campus/career/schedule/research",
                        "reasoning": "Why this would be helpful"
                    }}
                ]
            }}
            """

            response = model.generate_content(prompt)
            suggestions_data = json.loads(response.text) if response else {}

            return suggestions_data.get('suggestions', self._get_basic_suggestions(context, recent_conversations))

        except Exception as e:
            logger.error(f"Suggestions generation error: {str(e)}")
            return self._get_basic_suggestions(context, recent_conversations)

    def _get_basic_suggestions(self, context, recent_conversations):
        """Basic suggestions when AI is not available"""
        basic_suggestions = {
            'study': [
                {
                    'title': 'Study Techniques',
                    'prompt': 'What are some effective study techniques for memorizing complex concepts?',
                    'category': 'study',
                    'reasoning': 'Learn proven methods for better retention'
                },
                {
                    'title': 'Exam Preparation',
                    'prompt': 'How should I prepare for my upcoming exams?',
                    'category': 'study',
                    'reasoning': 'Get comprehensive exam preparation strategies'
                }
            ],
            'campus': [
                {
                    'title': 'Campus Resources',
                    'prompt': 'What study spots and resources are available on campus?',
                    'category': 'campus',
                    'reasoning': 'Discover useful campus facilities'
                },
                {
                    'title': 'Student Events',
                    'prompt': 'What events and activities are happening on campus this week?',
                    'category': 'campus',
                    'reasoning': 'Stay connected with campus community'
                }
            ],
            'career': [
                {
                    'title': 'Career Planning',
                    'prompt': 'How do I choose the right career path for my major?',
                    'category': 'career',
                    'reasoning': 'Get guidance on career decision making'
                },
                {
                    'title': 'Resume Help',
                    'prompt': 'How can I improve my resume for internships?',
                    'category': 'career',
                    'reasoning': 'Learn to create compelling resumes'
                }
            ],
            'schedule': [
                {
                    'title': 'Time Management',
                    'prompt': 'How can I better manage my time between classes and assignments?',
                    'category': 'schedule',
                    'reasoning': 'Improve productivity and reduce stress'
                },
                {
                    'title': 'Study Schedule',
                    'prompt': 'Help me create an effective study schedule for this semester',
                    'category': 'schedule',
                    'reasoning': 'Balance academic workload efficiently'
                }
            ]
        }

        # Return suggestions based on context or general if not found
        return basic_suggestions.get(context, basic_suggestions.get('study'))

# WebSocket consumer for real-time AI responses
class QuercusConsumer(View):
    """WebSocket consumer for real-time AI interactions"""

    def get_websocket_url(self):
        """Return WebSocket URL for Quercus AI"""
        return "/ws/quercus/"

    def handle_message(self, message_data):
        """Handle incoming WebSocket messages"""
        message_type = message_data.get('type')

        if message_type == 'ai_query':
            return self._handle_ai_query(message_data)
        elif message_type == 'conversation_history':
            return self._handle_conversation_history(message_data)
        elif message_type == 'campus_info':
            return self._handle_campus_info(message_data)

        return {'error': 'Unknown message type'}

    def _handle_ai_query(self, data):
        """Handle AI query through WebSocket"""
        prompt = data.get('prompt', '')
        context = data.get('context', 'campus_assistant')

        # This would typically use the same logic as the HTTP endpoint
        # but return the response through WebSocket
        return {
            'type': 'ai_response',
            'response': f'WebSocket AI response for: {prompt}',
            'timestamp': datetime.now().isoformat()
        }

    def _handle_conversation_history(self, data):
        """Handle conversation history request"""
        conversation_id = data.get('conversation_id')

        # Get conversation history
        return {
            'type': 'conversation_history',
            'conversations': [],  # Would fetch from database
            'timestamp': datetime.now().isoformat()
        }

    def _handle_campus_info(self, data):
        """Handle campus information request"""
        info_type = data.get('type', '')

        return {
            'type': 'campus_info',
            'info_type': info_type,
            'data': {},  # Would fetch campus resources
            'timestamp': datetime.now().isoformat()
        }

class QuercusImageAnalysisView(View):
    """View for analyzing images using Gemini Vision"""

    @method_decorator(csrf_exempt)
    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def post(self, request):
        """Analyze image using Gemini Vision"""
        try:
            data = json.loads(request.body)
            image_data = data.get('image_data', '')
            prompt = data.get('prompt', 'Analyze this image and provide helpful insights')
            context = data.get('context', 'image_analysis')
            conversation_id = data.get('conversation_id')

            if not image_data:
                return JsonResponse({
                    'error': 'Image data is required',
                    'success': False
                }, status=400)

            user = request.user

            # Get or create conversation
            if conversation_id:
                try:
                    conversation = QuercusConversation.objects.get(
                        conversation_id=conversation_id,
                        user=user
                    )
                except QuercusConversation.DoesNotExist:
                    conversation = self._create_conversation(user, conversation_id)
            else:
                conversation = self._create_conversation(user)

            # Generate image analysis response
            ai_response = self._analyze_image(image_data, prompt, context, user)

            # Save user message with image reference
            user_message = QuercusMessage.objects.create(
                conversation=conversation,
                message_id=f"user_img_{datetime.now().timestamp()}",
                content=f"[Image Analysis Request] {prompt}",
                is_user=True,
                metadata={
                    'type': 'image_analysis_request',
                    'has_image': True,
                    'prompt': prompt
                }
            )

            # Save AI response
            ai_message = QuercusMessage.objects.create(
                conversation=conversation,
                message_id=f"ai_img_{datetime.now().timestamp()}",
                content=ai_response,
                is_user=False,
                metadata={
                    'type': 'image_analysis_response',
                    'context': context,
                    'model': 'gemini-pro-vision'
                }
            )

            # Update conversation title if it's new
            if not conversation.title:
                conversation.title = "Image Analysis Session"
                conversation.save()

            # Update analytics
            self._update_analytics(user, context)

            return JsonResponse({
                'success': True,
                'response': ai_response,
                'conversation_id': conversation.conversation_id,
                'message_id': ai_message.message_id,
                'timestamp': ai_message.timestamp.isoformat(),
                'metadata': {
                    'context': context,
                    'analysis_type': 'image_analysis',
                    'model': 'gemini-pro-vision'
                }
            })

        except Exception as e:
            logger.error(f"Image analysis error: {str(e)}")
            return JsonResponse({
                'success': False,
                'error': 'Internal server error',
                'message': str(e)
            }, status=500)

    def _analyze_image(self, image_data, prompt, context, user):
        """Analyze image using Gemini Vision"""
        if not GEMINI_AVAILABLE:
            return "Image analysis is currently unavailable. Please try again later."

        try:
            api_key = getattr(settings, 'GEMINI_API_KEY', None)
            if not api_key:
                return "Image analysis configuration error. Please contact support."

            genai.configure(api_key=api_key)
            model = genai.GenerativeModel('gemini-pro-vision')

            # Create analysis prompt
            full_prompt = self._build_image_analysis_prompt(prompt, context, user)

            # For now, we'll use a placeholder for image data
            # In a real implementation, you'd decode the base64 image data
            # and pass it to the Gemini API
            image_placeholder = "Image content would be analyzed here"

            response = model.generate_content([full_prompt, image_placeholder])

            return response.text if response else "I couldn't analyze this image. Please try again."

        except Exception as e:
            logger.error(f"Gemini Vision API error: {str(e)}")
            return "I encountered an error while analyzing this image. Please try again."

    def _build_image_analysis_prompt(self, prompt, context, user):
        """Build prompt for image analysis"""
        base_prompt = f"""
        You are analyzing an image as Quercus, the campus AI assistant.

        User: {user.get_full_name() or user.username}
        Context: {context}
        Analysis Request: {prompt}

        Please provide helpful, educational insights about this image.
        If it's related to academic content, explain concepts clearly.
        If it's a campus photo, provide relevant information.
        Be encouraging and helpful in your analysis.

        Response:
        """

        return base_prompt.strip()

    def _create_conversation(self, user, conversation_id=None):
        """Create a new conversation"""
        if not conversation_id:
            conversation_id = f"img_conv_{user.id}_{datetime.now().timestamp()}"

        return QuercusConversation.objects.create(
            user=user,
            conversation_id=conversation_id,
            title=""
        )

    def _update_analytics(self, user, context):
        """Update user analytics"""
        today = datetime.now().date()

        analytics, created = QuercusAnalytics.objects.get_or_create(
            user=user,
            date=today,
            defaults={'total_queries': 0}
        )

        analytics.total_queries += 1

        # Update context-specific counters
        if 'image' in context:
            analytics.campus_queries += 1  # Using campus_queries for image analysis

        analytics.save()
