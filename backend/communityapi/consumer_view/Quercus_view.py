import json
import logging
import base64
import io
from datetime import datetime
from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth import get_user_model
from quercus.models import QuercusConversation, QuercusMessage, QuercusSettings
from quercus.serializers import (
    QuercusMessageSerializer,
    QuercusConversationSerializer,
    QuercusSettingsSerializer,
    QuercusErrorSerializer
)

logger = logging.getLogger(__name__)

# Quercus AI WebSocket handler functions for consumers.py


# Quercus AI WebSocket handler functions for consumers.py
def receive_quercus_ai_query(consumer, data):
    """Handle AI query requests"""
    user = consumer.scope["user"]
    prompt = data.get('prompt', '')
    context = data.get('context', 'campus_assistant')
    conversation_id = data.get('conversation_id')

    if not prompt:
        consumer.send_group(user.username, "quercus.error", {'error': 'Prompt is required'})
        return

    # Get or create conversation
    if conversation_id:
        try:
            conversation = QuercusConversation.objects.get(
                conversation_id=conversation_id,
                user=user
            )
        except QuercusConversation.DoesNotExist:
            conversation = create_conversation(user)
    else:
        conversation = create_conversation(user)

    # Save user message
    user_message = save_message(conversation, prompt, is_user=True, user=user)

    # Send typing indicator
    consumer.send_group(user.username, "quercus.typing", {'is_typing': True})

    # Generate AI response
    ai_response = generate_ai_response(prompt, context)

    # Save AI message
    ai_message = save_message(conversation, ai_response, is_user=False, user=user)

    # Send AI response
    response_data = {
        'response': ai_response,
        'conversation_id': conversation.conversation_id,
        'message_id': ai_message.message_id,
        'timestamp': ai_message.timestamp.isoformat(),
        'context': context,
        'success': True
    }
    consumer.send_group(user.username, "quercus.ai_response", response_data)

    # Stop typing indicator
    consumer.send_group(user.username, "quercus.typing", {'is_typing': False})


def receive_quercus_conversation_history(consumer, data):
    """Handle conversation history requests"""
    user = consumer.scope["user"]
    conversation_id = data.get('conversation_id')

    if conversation_id:
        # Get specific conversation
        try:
            conversation = QuercusConversation.objects.get(
                conversation_id=conversation_id,
                user=user
            )
            messages = get_conversation_messages(conversation)
            response_data = {
                'conversation_id': conversation_id,
                'messages': messages,
                'success': True
            }
            consumer.send_group(user.username, "quercus.conversation_history", response_data)
        except QuercusConversation.DoesNotExist:
            consumer.send_group(user.username, "quercus.error", {'error': 'Conversation not found'})
    else:
        # Get all conversations
        conversations = get_user_conversations(user)
        response_data = {
            'conversations': conversations,
            'success': True
        }
        consumer.send_group(user.username, "quercus.conversation_list", response_data)


def receive_quercus_campus_info(consumer, data):
    """Handle campus information requests"""
    user = consumer.scope["user"]
    info_type = data.get('type', '')
    query = data.get('query', '')

    # This would integrate with campus resources
    campus_data = {
        'type': info_type,
        'query': query,
        'resources': [
            {
                'name': 'Main Library',
                'type': 'study_spot',
                'description': 'Quiet study area with computers',
                'location': 'Technovation hub, Floor 2'
            },
            
        ]
    }

    consumer.send_group(user.username, "quercus.campus_info", campus_data)


def receive_quercus_study_plan(consumer, data):
    """Handle study plan requests"""
    user = consumer.scope["user"]
    subject = data.get('subject', '')
    duration = data.get('duration', 4)
    difficulty = data.get('difficulty', 'intermediate')

    # Generate study plan
    study_plan = {
        'subject': subject,
        'duration_weeks': duration,
        'difficulty': difficulty,
        'weeks': [
            {
                'week': i + 1,
                'focus': f'{subject} fundamentals',
                'daily_tasks': [
                    f'Study {subject} concepts',
                    'Practice exercises',
                    'Review notes'
                ]
            } for i in range(duration)
        ]
    }

    consumer.send_group(user.username, "quercus.study_plan", study_plan)


def receive_quercus_career_guidance(consumer, data):
    """Handle career guidance requests"""
    user = consumer.scope["user"]
    field = data.get('field', '')
    interests = data.get('interests', '')

    career_guidance = {
        'field': field,
        'interests': interests,
        'career_paths': [
            f'{field} Specialist',
            f'{field} Consultant',
            f'{field} Researcher'
        ],
        'skills': ['Technical expertise', 'Communication', 'Problem-solving'],
        'next_steps': ['Build portfolio', 'Gain experience', 'Network']
    }

    consumer.send_group(user.username, "quercus.career_guidance", career_guidance)


def receive_quercus_settings_update(consumer, data):
    """Handle AI settings updates"""
    user = consumer.scope["user"]
    settings = data.get('settings', {})

    # Update or create settings
    quercus_settings, created = QuercusSettings.objects.get_or_create(
        user=user,
        defaults={
            'response_style': 'concise',
            'auto_save': True,
            'notifications_enabled': True,
        }
    )

    # Update settings
    for key, value in settings.items():
        if hasattr(quercus_settings, key):
            setattr(quercus_settings, key, value)

    quercus_settings.save()

    consumer.send_group(user.username, "quercus.settings_updated", settings)


def receive_quercus_conversation_create(consumer, data):
    """Handle new conversation creation"""
    user = consumer.scope["user"]
    title = data.get('title', '')

    conversation = create_conversation(user, title)

    response_data = {
        'conversation_id': conversation.conversation_id,
        'title': conversation.title,
        'success': True
    }
    consumer.send_group(user.username, "quercus.conversation_created", response_data)


def receive_quercus_typing_start(consumer, data):
    """Handle typing indicator start"""
    user = consumer.scope["user"]
    consumer.send_group(user.username, "quercus.typing", {'is_typing': True})


def receive_quercus_typing_end(consumer, data):
    """Handle typing indicator end"""
    user = consumer.scope["user"]
    consumer.send_group(user.username, "quercus.typing", {'is_typing': False})


def receive_quercus_image_analysis(consumer, data):
    """Handle image analysis requests"""
    user = consumer.scope["user"]
    image_data = data.get('image_data', '')
    prompt = data.get('prompt', 'Analyze this image and provide helpful insights')
    context = data.get('context', 'image_analysis')
    conversation_id = data.get('conversation_id')

    if not image_data:
        consumer.send_group(user.username, "quercus.error", {'error': 'Image data is required'})
        return

    # Get or create conversation
    if conversation_id:
        try:
            conversation = QuercusConversation.objects.get(
                conversation_id=conversation_id,
                user=user
            )
        except QuercusConversation.DoesNotExist:
            conversation = create_conversation(user)
    else:
        conversation = create_conversation(user)

    # Save user message with image reference
    user_message = save_message(
        conversation,
        f"[Image Analysis Request] {prompt}",
        is_user=True,
        user=user
    )

    # Send typing indicator
    consumer.send_group(user.username, "quercus.typing", {'is_typing': True})

    # Generate image analysis response
    ai_response = generate_image_analysis_response(image_data, prompt, context)

    # Save AI message
    ai_message = save_message(conversation, ai_response, is_user=False, user=user)

    # Send AI response
    response_data = {
        'response': ai_response,
        'conversation_id': conversation.conversation_id,
        'message_id': ai_message.message_id,
        'timestamp': ai_message.timestamp.isoformat(),
        'context': context,
        'metadata': {
            'analysis_type': 'image_analysis',
            'model': 'gemini-2.5-flash'
        },
        'success': True
    }
    consumer.send_group(user.username, "quercus.image_analysis", response_data)

    # Stop typing indicator
    consumer.send_group(user.username, "quercus.typing", {'is_typing': False})


def receive_quercus_document_analysis(consumer, data):
    """Handle document analysis requests"""
    user = consumer.scope["user"]
    document_data = data.get('document_data', '')
    document_type = data.get('document_type', 'text')
    prompt = data.get('prompt', 'Analyze this document and provide insights')
    context = data.get('context', 'document_analysis')
    conversation_id = data.get('conversation_id')

    if not document_data:
        consumer.send_group(user.username, "quercus.error", {'error': 'Document data is required'})
        return

    # Get or create conversation
    if conversation_id:
        try:
            conversation = QuercusConversation.objects.get(
                conversation_id=conversation_id,
                user=user
            )
        except QuercusConversation.DoesNotExist:
            conversation = create_conversation(user)
    else:
        conversation = create_conversation(user)

    # Save user message with document reference
    user_message = save_message(
        conversation,
        f"[Document Analysis Request] {prompt}",
        is_user=True,
        user=user
    )

    # Send typing indicator
    consumer.send_group(user.username, "quercus.typing", {'is_typing': True})

    # Generate document analysis response
    ai_response = generate_document_analysis_response(document_data, document_type, prompt, context)

    # Save AI message
    ai_message = save_message(conversation, ai_response, is_user=False, user=user)

    # Send AI response
    response_data = {
        'response': ai_response,
        'conversation_id': conversation.conversation_id,
        'message_id': ai_message.message_id,
        'timestamp': ai_message.timestamp.isoformat(),
        'context': context,
        'metadata': {
            'analysis_type': 'document_analysis',
            'document_type': document_type,
            'model': 'gemini-2.5-flash'
        },
        'success': True
    }
    consumer.send_group(user.username, "quercus.document_analysis", response_data)

    # Stop typing indicator
    consumer.send_group(user.username, "quercus.typing", {'is_typing': False})


def receive_quercus_conversation_summary(consumer, data):
    """Handle conversation summary requests"""
    user = consumer.scope["user"]
    conversation_id = data.get('conversation_id')

    if not conversation_id:
        consumer.send_group(user.username, "quercus.error", {'error': 'Conversation ID is required'})
        return

    try:
        conversation = QuercusConversation.objects.get(
            conversation_id=conversation_id,
            user=user,
            is_active=True
        )

        # Get conversation messages
        messages = get_conversation_messages(conversation)

        if not messages:
            response_data = {
                'conversation_id': conversation_id,
                'summary': 'No messages in this conversation yet.',
                'message_count': 0,
                'success': True
            }
            consumer.send_group(user.username, "quercus.conversation_summary", response_data)
            return

        # Generate summary
        summary_data = generate_conversation_summary(messages, conversation)

        response_data = {
            'conversation_id': conversation_id,
            'summary': summary_data,
            'success': True
        }
        consumer.send_group(user.username, "quercus.conversation_summary", response_data)

    except QuercusConversation.DoesNotExist:
        consumer.send_group(user.username, "quercus.error", {'error': 'Conversation not found'})


def receive_quercus_conversation_insights(consumer, data):
    """Handle conversation insights requests"""
    user = consumer.scope["user"]
    conversation_id = data.get('conversation_id')

    if not conversation_id:
        consumer.send_group(user.username, "quercus.error", {'error': 'Conversation ID is required'})
        return

    try:
        conversation = QuercusConversation.objects.get(
            conversation_id=conversation_id,
            user=user,
            is_active=True
        )

        # Get conversation messages
        messages = get_conversation_messages(conversation)

        if not messages:
            response_data = {
                'conversation_id': conversation_id,
                'insights': 'No messages to analyze yet.',
                'message_count': 0,
                'success': True
            }
            consumer.send_group(user.username, "quercus.conversation_insights", response_data)
            return

        # Generate insights
        insights_data = generate_conversation_insights(messages, conversation)

        response_data = {
            'conversation_id': conversation_id,
            'insights': insights_data,
            'success': True
        }
        consumer.send_group(user.username, "quercus.conversation_insights", response_data)

    except QuercusConversation.DoesNotExist:
        consumer.send_group(user.username, "quercus.error", {'error': 'Conversation not found'})


def receive_quercus_analytics(consumer, data):
    """Handle analytics requests"""
    user = consumer.scope["user"]
    days = data.get('days', 30)

    # Get analytics data
    analytics_data = get_user_analytics(user, days)

    response_data = {
        'analytics': analytics_data,
        'period_days': days,
        'success': True
    }
    consumer.send_group(user.username, "quercus.analytics", response_data)


def receive_quercus_suggestions(consumer, data):
    """Handle AI suggestions requests"""
    user = consumer.scope["user"]
    context = data.get('context', 'general')
    conversation_id = data.get('conversation_id')

    # Generate suggestions based on context and user history
    suggestions = generate_ai_suggestions(context, user, conversation_id)

    response_data = {
        'suggestions': suggestions,
        'context': context,
        'success': True
    }
    consumer.send_group(user.username, "quercus.suggestions", response_data)


# Helper functions
def create_conversation(user, title=None):
    """Create new conversation"""
    conversation_id = f"conv_{user.id}_{datetime.now().timestamp()}"
    return QuercusConversation.objects.create(
        user=user,
        conversation_id=conversation_id,
        title=title or ""
    )


def save_message(conversation, content, is_user=True, user=None):
    """Save message to conversation"""
    message_id = f"msg_{conversation.id}_{datetime.now().timestamp()}"
    return QuercusMessage.objects.create(
        conversation=conversation,
        message_id=message_id,
        content=content,
        is_user=is_user,
        metadata={'source': 'websocket'}
    )


def get_conversation_messages(conversation):
    """Get all messages in conversation"""
    messages = QuercusMessage.objects.filter(conversation=conversation).order_by('timestamp')
    serializer = QuercusMessageSerializer(messages, many=True)
    return serializer.data


def get_user_conversations(user):
    """Get all user conversations"""
    conversations = QuercusConversation.objects.filter(
        user=user,
        is_active=True
    ).order_by('-updated_at')[:20]

    serializer = QuercusConversationSerializer(conversations, many=True)
    return serializer.data


def generate_ai_response(prompt, context):
    """Generate AI response using Gemini API"""
    try:
        # Import Gemini AI
        import google.generativeai as genai
        from django.conf import settings

        api_key = getattr(settings, 'GEMINI_API_KEY', None)
        if not api_key or api_key.startswith('AIzaSyDdemo') or 'demo' in api_key.lower():
            # Return enhanced fallback response for demo mode
            return generate_enhanced_demo_response(prompt, context)

        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-2.5-flash')

        # Create context-aware prompt
        full_prompt = f"""
        Context: {context}
        Student Query: {prompt}

       
        """

        response = model.generate_content(full_prompt)
        return response.text if response else generate_enhanced_demo_response(prompt, context)

    except Exception as e:
        logger.error(f"Gemini API error: {str(e)}")
        return generate_enhanced_demo_response(prompt, context)


def generate_image_analysis_response(image_data, prompt, context):
    """Generate image analysis response using Gemini"""
    try:
        # Import Gemini AI
        import google.generativeai as genai
        from django.conf import settings
        import base64
        import io
        from PIL import Image

        api_key = getattr(settings, 'GEMINI_API_KEY', None)
        if not api_key or api_key.startswith('AIzaSyDdemo') or 'demo' in api_key.lower() or 'demo_key_for_testing' in api_key:
            return generate_enhanced_demo_response(f"analyze image: {prompt}", context)

        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-2.5-flash')  # Gemini 1.5 Pro supports vision

        # Handle different image data formats
        image_parts = []

        if image_data.startswith('data:image'):
            # Handle data URL format (base64 with MIME type)
            try:
                # Extract base64 data from data URL
                header, base64_data = image_data.split(',', 1)
                mime_type = header.split(':')[1].split(';')[0]

                # Decode base64 image data
                image_bytes = base64.b64decode(base64_data)

                # Create PIL Image from bytes
                image = Image.open(io.BytesIO(image_bytes))

                # Convert to RGB if necessary (Gemini works best with RGB)
                if image.mode != 'RGB':
                    image = image.convert('RGB')

                # Save to bytes for Gemini
                output = io.BytesIO()
                image.save(output, format='JPEG')
                image_bytes = output.getvalue()

                # Create Gemini image part
                image_part = {
                    "mime_type": "image/jpeg",
                    "data": image_bytes
                }
                image_parts.append(image_part)

            except Exception as e:
                logger.error(f"Error processing data URL image: {str(e)}")
                return "I couldn't process this image format. Please try uploading a standard image file."

        elif image_data.startswith('http'):
            # Handle URL format
            try:
                import requests
                response = requests.get(image_data)
                response.raise_for_status()

                # Create PIL Image from URL content
                image = Image.open(io.BytesIO(response.content))

                # Convert to RGB if necessary
                if image.mode != 'RGB':
                    image = image.convert('RGB')

                # Save to bytes for Gemini
                output = io.BytesIO()
                image.save(output, format='JPEG')
                image_bytes = output.getvalue()

                # Create Gemini image part
                image_part = {
                    "mime_type": "image/jpeg",
                    "data": image_bytes
                }
                image_parts.append(image_part)

            except Exception as e:
                logger.error(f"Error processing URL image: {str(e)}")
                return "I couldn't access this image URL. Please try uploading the image directly."

        else:
            # Assume raw base64 data
            try:
                # Ensure the base64 data is properly formatted
                if ',' in image_data:
                    # Handle data URL format that might not have been caught above
                    image_data = image_data.split(',')[1]

                # Add padding if necessary
                missing_padding = len(image_data) % 4
                if missing_padding:
                    image_data += '=' * (4 - missing_padding)

                # Decode base64 image data
                image_bytes = base64.b64decode(image_data)

                # Create PIL Image from bytes
                image = Image.open(io.BytesIO(image_bytes))

                # Convert to RGB if necessary (Gemini works best with RGB)
                if image.mode != 'RGB':
                    image = image.convert('RGB')

                # Save to bytes for Gemini
                output = io.BytesIO()
                image.save(output, format='JPEG')
                processed_image_bytes = output.getvalue()

                # Create Gemini image part
                image_part = {
                    "mime_type": "image/jpeg",
                    "data": processed_image_bytes
                }
                image_parts.append(image_part)

            except Exception as e:
                logger.error(f"Error processing base64 image: {str(e)}")
                return "I couldn't process this image data. Please ensure you're uploading a valid image file."

        if not image_parts:
            return "I couldn't process this image. Please try again with a different image format."

        # Create context-aware prompt for educational analysis
        full_prompt = f"""
         {prompt}

        Please analyze this image and provide helpful insights. Consider:

        - If it's academic content (diagrams, notes, textbooks), explain concepts clearly
        - If it's research material, highlight key findings and methodologies
        - If it's study notes or flashcards, suggest memory techniques
        - If it's a math/science problem, provide step-by-step solutions
        - If it's a programming code snippet, explain the logic and suggest improvements

        Focus on being educational, encouraging, and actionable in your response.
       

        Student request: {prompt}
        """

        # Generate response using Gemini Vision
        response = model.generate_content([full_prompt] + image_parts)

        if response and response.text:
            return response.text
        else:
            return "I can see the image but couldn't generate a detailed analysis. Please try rephrasing your question or uploading the image again."

    except ImportError as e:
        logger.error(f"Missing dependency for image analysis: {str(e)}")
        return "Image analysis is not properly configured. Please contact support."

    except Exception as e:
        logger.error(f"Gemini Vision API error: {str(e)}")
        return "I encountered an error while analyzing this image. Please try again or contact support if the issue persists."


def generate_document_analysis_response(document_data, document_type, prompt, context):
    """Generate document analysis response using Gemini"""
    try:
        # Import Gemini AI
        import google.generativeai as genai
        from django.conf import settings

        api_key = getattr(settings, 'GEMINI_API_KEY', None)
        if not api_key:
            return "Document analysis configuration error. Please contact support."

        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-2.5-flash')

        # Truncate document if too long
        max_length = 6000
        if len(document_data) > max_length:
            document_data = document_data[:max_length] + "... [document truncated]"

        full_prompt = f"""
      
              Document Type: {document_type}
        Analysis Request: {prompt}

        Document Content:
        {document_data}

        Please provide helpful, insights about this document.

        Response:
        """

        response = model.generate_content(full_prompt)
        return response.text if response else "I couldn't analyze this document. Please try again."

    except Exception as e:
        logger.error(f"Document analysis error: {str(e)}")
        return "I encountered an error while analyzing this document. Please try again."


def generate_conversation_summary(messages, conversation):
    """Generate conversation summary"""
    try:
        # Import Gemini AI
        import google.generativeai as genai
        from django.conf import settings

        api_key = getattr(settings, 'GEMINI_API_KEY', None)
        if not api_key:
            return get_basic_conversation_summary(messages, conversation)

        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-2.5-flash')

        # Prepare conversation text
        conversation_text = ""
        for msg in messages:
            role = "User" if msg.get('is_user', False) else "Quercus AI"
            conversation_text += f"{role}: {msg.get('content', '')}\n\n"

        prompt = f"""
        Please analyze this conversation between a student and Quercus AI assistant.
        Provide a comprehensive summary with insights.

        Conversation:
        {conversation_text}

        Please provide:
        1. A brief overall summary (2-3 sentences)
        2. Key topics discussed (3-5 main themes)
        3. Main insights or learning points
        4. Action items or next steps mentioned

        Format as JSON.
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
        logger.error(f"Conversation summary error: {str(e)}")
        return get_basic_conversation_summary(messages, conversation)


def generate_conversation_insights(messages, conversation):
    """Generate conversation insights"""
    try:
        # Import Gemini AI
        import google.generativeai as genai
        from django.conf import settings

        api_key = getattr(settings, 'GEMINI_API_KEY', None)
        if not api_key:
            return get_basic_conversation_insights(messages, conversation)

        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-2.5-flash')

        # Prepare conversation for analysis
        conversation_text = ""
        for msg in messages:
            role = "User" if msg.get('is_user', False) else "Quercus AI"
            conversation_text += f"{role}: {msg.get('content', '')}\n\n"

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
            'user_messages': len([m for m in messages if m.get('is_user', False)]),
            'ai_messages': len([m for m in messages if not m.get('is_user', False)]),
            'duration': calculate_conversation_duration(messages),
            'avg_response_length': calculate_avg_response_length(messages)
        })

        return insights_data

    except Exception as e:
        logger.error(f"Conversation insights error: {str(e)}")
        return get_basic_conversation_insights(messages, conversation)


def get_user_analytics(user, days):
    """Get user analytics data"""
    from datetime import datetime, timedelta
    from quercus.models import QuercusAnalytics

    end_date = datetime.now().date()
    start_date = end_date - timedelta(days=days)

    analytics_data = QuercusAnalytics.objects.filter(
        user=user,
        date__gte=start_date,
        date__lte=end_date
    ).order_by('date')

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
        'total_conversations': QuercusConversation.objects.filter(user=user).count(),
        'avg_queries_per_day': round(total_queries / len(analytics_data), 1),
        'most_active_context': most_active_context,
        'total_study_queries': total_study,
        'total_campus_queries': total_campus,
        'total_career_queries': total_career,
        'total_schedule_queries': total_schedule
    }


def generate_ai_suggestions(context, user, conversation_id=None):
    """Generate AI-powered suggestions"""
    try:
        # Import Gemini AI
        import google.generativeai as genai
        from django.conf import settings

        api_key = getattr(settings, 'GEMINI_API_KEY', None)
        if not api_key:
            return get_basic_suggestions(context)

        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-2.5-flash')

        # Get user's conversation history for context
        recent_conversations = QuercusConversation.objects.filter(
            user=user,
            is_active=True
        ).order_by('-updated_at')[:5]

        conversation_context = ""
        if recent_conversations:
            conversation_context = "Recent conversation topics:\n"
            for conv in recent_conversations:
                last_message = conv.messages.last()
                if last_message:
                    preview = last_message.content[:100] + '...' if len(last_message.content) > 100 else last_message.content
                    conversation_context += f"- {conv.title or 'Untitled'}: {preview}\n"

        prompt = f"""
        

        User Context:
        - Current context: {context}
        {conversation_context}



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

        return suggestions_data.get('suggestions', get_basic_suggestions(context))

    except Exception as e:
        logger.error(f"Suggestions generation error: {str(e)}")
        return get_basic_suggestions(context)


def get_basic_conversation_summary(messages, conversation):
    """Basic conversation summary when AI is not available"""
    user_messages = [msg for msg in messages if msg.get('is_user', False)]
    ai_messages = [msg for msg in messages if not msg.get('is_user', False)]

    return {
        'conversation_id': conversation.conversation_id,
        'title': conversation.title or 'Untitled Conversation',
        'message_count': len(messages),
        'created_at': conversation.created_at.isoformat(),
        'last_activity': conversation.updated_at.isoformat(),
        'overall_summary': f"This conversation contains {len(messages)} messages with {len(user_messages)} questions and {len(ai_messages)} AI responses.",
        'key_topics': ['General Discussion'],
        'insights': ['Conversation analysis provides valuable learning insights'],
        'action_items': ['Continue exploring topics of interest']
    }


def get_basic_conversation_insights(messages, conversation):
    """Basic conversation insights when AI is not available"""
    user_messages = [msg for msg in messages if msg.get('is_user', False)]
    ai_messages = [msg for msg in messages if not msg.get('is_user', False)]

    total_length = sum(len(msg.get('content', '')) for msg in messages)
    avg_length = total_length // len(messages) if messages else 0

    return {
        'conversation_id': conversation.conversation_id,
        'title': conversation.title or 'Untitled Conversation',
        'message_count': len(messages),
        'user_messages': len(user_messages),
        'ai_messages': len(ai_messages),
        'duration': calculate_conversation_duration(messages),
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


def calculate_conversation_duration(messages):
    """Calculate conversation duration in minutes"""
    if len(messages) < 2:
        return 0

    timestamps = [msg.get('timestamp') for msg in messages if msg.get('timestamp')]
    if not timestamps:
        return 0

    start_time = min(timestamps)
    end_time = max(timestamps)

    duration_seconds = (end_time - start_time).total_seconds()
    return round(duration_seconds / 60, 1)


def calculate_avg_response_length(messages):
    """Calculate average response length"""
    if not messages:
        return 0

    total_chars = sum(len(msg.get('content', '')) for msg in messages)
    return total_chars // len(messages)


def generate_enhanced_demo_response(prompt, context):
    """Generate enhanced demo responses when Gemini API is not available"""
    prompt_lower = prompt.lower()

    # Study-related responses
    if context == 'study' or any(word in prompt_lower for word in ['study', 'learn', 'understand', 'concept', 'explain']):
        return f"I understand you want help with studying '{prompt}'. Here are some effective strategies:\n\n• Break down complex topics into smaller, manageable sections\n• Use active recall techniques - test yourself regularly\n• Create concept maps to visualize connections\n• Join or form study groups for discussion\n• Use spaced repetition for better retention\n• Take regular breaks using the Pomodoro technique\n\nWould you like me to elaborate on any of these techniques or help you create a specific study plan?"

    # Schedule-related responses
    elif context == 'schedule' or any(word in prompt_lower for word in ['schedule', 'time', 'plan', 'organize']):
        return f"For scheduling help with '{prompt}', I recommend:\n\n• Creating a weekly timetable with dedicated study blocks\n• Using time-blocking to allocate specific hours for each subject\n• Including buffer time for unexpected tasks or overflow\n• Scheduling regular review sessions for each course\n• Balancing academic work with rest and personal time\n• Using tools like Google Calendar or Todoist for organization\n\nWould you like help creating a personalized study schedule?"

    # Campus-related responses
    elif context == 'campus' or any(word in prompt_lower for word in ['campus', 'library', 'dining', 'event', 'club']):
        return f"For campus information about '{prompt}', I suggest:\n\n• Checking the student portal for official announcements\n• Visiting the campus website for facility hours and locations\n• Following official social media accounts for real-time updates\n• Joining relevant student organizations and clubs\n• Attending academic department events and seminars\n• Utilizing campus resources like tutoring centers and libraries\n\nWould you like specific information about particular campus facilities?"

    # Career-related responses
    elif context == 'career' or any(word in prompt_lower for word in ['career', 'job', 'internship', 'resume', 'interview']):
        return f"For career guidance regarding '{prompt}', consider:\n\n• Building a strong foundation in your field of study\n• Gaining practical experience through internships or projects\n• Developing a professional network through LinkedIn and events\n• Creating a portfolio showcasing your skills and achievements\n• Practicing interview skills and elevator pitches\n• Researching industry trends and job market demands\n\nWould you like specific advice for your field of study or help with resume preparation?"

    # Default enhanced response
    else:
        return f"I'm here to help with '{prompt}' as your campus AI assistant. I can provide guidance on:\n\n• Academic support and study strategies\n• Campus resources and facility information\n• Schedule planning and time management\n• Career guidance and professional development\n• Research assistance and project help\n• General student life questions\n\nPlease provide more specific details about what you need help with, and I'll do my best to assist you!"


def get_basic_suggestions(context):
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

    return basic_suggestions.get(context, basic_suggestions.get('study'))
