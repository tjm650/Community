import json
import re
from datetime import datetime
from django.db.models import Q
from amonetization.models import ServiceGuide, ServiceDocument, ServiceGuideSearch, ServiceGuideAnalytics

# Free AI models using Transformers.js
try:
    from transformers import pipeline
    AI_MODELS_AVAILABLE = True
except ImportError:
    AI_MODELS_AVAILABLE = False
    print("Warning: transformers not available, falling back to rule-based AI")

class AIService:
    """AI Service for Service Guide Search and Recommendations using free AI models"""

    def __init__(self):
        self.intent_classifier = None
        self.text_embedder = None
        self.summarizer = None
        self.initialized = False

        # Fallback intent keywords for when AI models are not available
        self.intent_keywords = {
            'FINANCIAL': [
                'financial', 'aid', 'scholarship', 'money', 'grant', 'loan', 'tuition',
                'fee', 'payment', 'funding', 'bursary', 'assistance', 'support'
            ],
            'ACADEMIC': [
                'academic', 'library', 'book', 'research', 'study', 'course', 'class',
                'assignment', 'grade', 'exam', 'professor', 'lecture', 'database'
            ],
            'HEALTH': [
                'health', 'medical', 'doctor', 'clinic', 'counseling', 'mental health',
                'wellness', 'sick', 'medicine', 'therapy', 'emergency', 'nurse'
            ],
            'CAREER': [
                'career', 'job', 'internship', 'employment', 'work', 'resume', 'interview',
                'application', 'hiring', 'professional', 'development', 'placement'
            ],
            'HOUSING': [
                'housing', 'accommodation', 'dorm', 'residence', 'room', 'apartment',
                'hostel', 'shelter', 'living', 'rent', 'lease', 'campus housing'
            ],
            'ADMINISTRATIVE': [
                'administrative', 'registration', 'records', 'transcript', 'certificate',
                'document', 'form', 'application', 'policy', 'procedure', 'office'
            ],
            'STUDENT_SERVICES': [
                'student services', 'support', 'help', 'assistance', 'guidance',
                'advising', 'counselor', 'orientation', 'student life', 'activities'
            ]
        }

    async def initialize(self):
        """Initialize free AI models"""
        if self.initialized:
            return

        if not AI_MODELS_AVAILABLE:
            print("AI models not available, using rule-based approach")
            self.initialized = True
            return

        try:
            print('Initializing free AI models...')

            # Initialize intent classification model (free model)
            self.intent_classifier = pipeline(
                'text-classification',
                model='microsoft/DialoGPT-medium',
                device=-1  # Use CPU
            )

            # Initialize text embedding model (free model)
            self.text_embedder = pipeline(
                'feature-extraction',
                model='sentence-transformers/all-MiniLM-L6-v2',
                device=-1  # Use CPU
            )

            # Initialize summarization model (free model)
            self.summarizer = pipeline(
                'summarization',
                model='facebook/bart-large-cnn',
                device=-1  # Use CPU
            )

            self.initialized = True
            print('Free AI models initialized successfully')
        except Exception as e:
            print(f'Failed to initialize AI models: {e}')
            print('Falling back to rule-based approach')
            self.initialized = True

    def classify_intent(self, query):
        """Classify the intent of a user query using free AI models"""
        if not self.initialized:
            import asyncio
            asyncio.run(self.initialize())

        # Try AI-based classification first
        if self.intent_classifier:
            try:
                # Use AI model to classify intent
                result = self.intent_classifier(query, return_all_scores=True)

                # Map AI results to our intents
                intent_scores = {}
                for prediction in result:
                    label = prediction['label'].upper()
                    score = prediction['score']

                    # Map to our intent categories
                    if 'FINANCIAL' in label or 'MONEY' in label:
                        intent_scores['FINANCIAL'] = intent_scores.get('FINANCIAL', 0) + score
                    elif 'ACADEMIC' in label or 'STUDY' in label or 'RESEARCH' in label:
                        intent_scores['ACADEMIC'] = intent_scores.get('ACADEMIC', 0) + score
                    elif 'HEALTH' in label or 'MEDICAL' in label:
                        intent_scores['HEALTH'] = intent_scores.get('HEALTH', 0) + score
                    elif 'CAREER' in label or 'JOB' in label or 'WORK' in label:
                        intent_scores['CAREER'] = intent_scores.get('CAREER', 0) + score
                    elif 'HOUSING' in label or 'ACCOMMODATION' in label:
                        intent_scores['HOUSING'] = intent_scores.get('HOUSING', 0) + score
                    elif 'ADMIN' in label or 'REGISTRATION' in label:
                        intent_scores['ADMINISTRATIVE'] = intent_scores.get('ADMINISTRATIVE', 0) + score
                    elif 'STUDENT' in label or 'SERVICE' in label:
                        intent_scores['STUDENT_SERVICES'] = intent_scores.get('STUDENT_SERVICES', 0) + score

                if intent_scores:
                    best_intent = max(intent_scores.items(), key=lambda x: x[1])
                    return {
                        'intent': best_intent[0],
                        'confidence': min(best_intent[1], 1.0),
                        'score': best_intent[1]
                    }
            except Exception as e:
                print(f'AI classification failed: {e}')

        # Fallback to rule-based classification
        return self.classify_intent_rule_based(query)

    def classify_intent_rule_based(self, query):
        """Fallback rule-based intent classification"""
        query_lower = query.lower()

        # Calculate scores for each intent
        intent_scores = {}
        for intent, keywords in self.intent_keywords.items():
            score = 0
            for keyword in keywords:
                if keyword in query_lower:
                    score += 1
                # Check for partial matches
                if any(word in query_lower for word in keyword.split()):
                    score += 0.5

            if score > 0:
                intent_scores[intent] = score

        # Return the intent with highest score
        if intent_scores:
            best_intent = max(intent_scores.items(), key=lambda x: x[1])
            confidence = min(best_intent[1] / 3.0, 1.0)  # Normalize confidence
            return {
                'intent': best_intent[0],
                'confidence': confidence,
                'score': best_intent[1]
            }

        return {
            'intent': 'GENERAL',
            'confidence': 0.5,
            'score': 0
        }

    def search_documents(self, query, intent_result, limit=10):
        """Search documents based on query and intent using free AI models"""
        # Get all documents
        documents = ServiceDocument.objects.filter(
            service_guide__is_verified=True,
            service_guide__is_active=True
        ).select_related('service_guide')

        # Apply text search
        if query:
            search_terms = query.lower().split()
            document_query = Q()

            for term in search_terms:
                document_query |= Q(title__icontains=term)
                document_query |= Q(description__icontains=term)
                document_query |= Q(content__icontains=term)
                document_query |= Q(service_guide__service_name__icontains=term)
                document_query |= Q(service_guide__description__icontains=term)

            documents = documents.filter(document_query)

        # Apply intent-based filtering
        if intent_result['intent'] != 'GENERAL':
            intent_keywords = self.intent_keywords[intent_result['intent']]
            intent_query = Q()

            for keyword in intent_keywords:
                intent_query |= Q(title__icontains=keyword)
                intent_query |= Q(description__icontains=keyword)
                intent_query |= Q(content__icontains=keyword)
                intent_query |= Q(service_guide__service_name__icontains=keyword)
                intent_query |= Q(service_guide__service_type__icontains=intent_result['intent'])

            documents = documents.filter(intent_query)

        # Calculate relevance scores using AI embeddings
        scored_documents = []
        for doc in documents[:limit * 3]:  # Get more to allow for AI scoring
            relevance_score = self.calculate_document_relevance_ai(doc, query, intent_result)
            scored_documents.append({
                'document': doc,
                'relevance_score': relevance_score
            })

        # Sort by relevance and return top results
        scored_documents.sort(key=lambda x: x['relevance_score'], reverse=True)
        return scored_documents[:limit]

    def calculate_document_relevance_ai(self, document, query, intent_result):
        """Calculate relevance score for a document using AI embeddings"""
        if not self.initialized:
            import asyncio
            asyncio.run(self.initialize())

        # Try AI-based relevance scoring first
        if self.text_embedder:
            try:
                # Generate embeddings for query and document
                query_embedding = self.text_embedder(query)[0][0]
                doc_text = f"{document.title} {document.description} {getattr(document, 'content', '')}"
                doc_embedding = self.text_embedder(doc_text)[0][0]

                # Calculate cosine similarity
                similarity = self.calculate_cosine_similarity(query_embedding, doc_embedding)

                # Combine with intent matching
                intent_bonus = 0.3 if intent_result['intent'] in document.service_guide.service_type else 0
                verified_bonus = 0.2 if document.service_guide.is_verified else 0

                return min(similarity + intent_bonus + verified_bonus, 1.0)
            except Exception as e:
                print(f'AI relevance calculation failed: {e}')

        # Fallback to rule-based scoring
        return self.calculate_document_relevance_rule_based(document, query, intent_result)

    def calculate_document_relevance_rule_based(self, document, query, intent_result):
        """Fallback rule-based relevance calculation"""
        score = 0
        query_lower = query.lower()

        # Title match (highest weight)
        if query_lower in document.title.lower():
            score += 1.0
        elif any(word in document.title.lower() for word in query_lower.split()):
            score += 0.7

        # Description match
        if query_lower in document.description.lower():
            score += 0.8
        elif any(word in document.description.lower() for word in query_lower.split()):
            score += 0.5

        # Content match (if available)
        if hasattr(document, 'content') and document.content:
            if query_lower in document.content.lower():
                score += 0.6
            elif any(word in document.content.lower() for word in query_lower.split()):
                score += 0.4

        # Service name match
        if query_lower in document.service_guide.service_name.lower():
            score += 0.8
        elif any(word in document.service_guide.service_name.lower() for word in query_lower.split()):
            score += 0.5

        # Intent match bonus
        if intent_result['intent'] in document.service_guide.service_type:
            score += 0.3

        # Boost verified services
        if document.service_guide.is_verified:
            score += 0.2

        return min(score, 1.0)  # Cap at 1.0

    def calculate_cosine_similarity(self, vec_a, vec_b):
        """Calculate cosine similarity between two vectors"""
        dot_product = sum(a * b for a, b in zip(vec_a, vec_b))
        norm_a = sum(a * a for a in vec_a) ** 0.5
        norm_b = sum(b * b for b in vec_b) ** 0.5

        if norm_a == 0 or norm_b == 0:
            return 0.0

        return dot_product / (norm_a * norm_b)

    def search_services(self, query, intent_result, limit=5):
        """Search services based on query and intent"""
        services = ServiceGuide.objects.filter(
            is_verified=True,
            is_active=True
        )

        # Apply text search
        if query:
            search_terms = query.lower().split()
            service_query = Q()

            for term in search_terms:
                service_query |= Q(service_name__icontains=term)
                service_query |= Q(description__icontains=term)
                service_query |= Q(department__icontains=term)

            services = services.filter(service_query)

        # Apply intent-based filtering
        if intent_result['intent'] != 'GENERAL':
            intent_keywords = self.intent_keywords[intent_result['intent']]
            intent_query = Q()

            for keyword in intent_keywords:
                intent_query |= Q(service_name__icontains=keyword)
                intent_query |= Q(description__icontains=keyword)
                intent_query |= Q(service_type__icontains=intent_result['intent'])

            services = services.filter(intent_query)

        # Calculate relevance scores
        scored_services = []
        for service in services[:limit * 2]:  # Get more to allow for scoring
            relevance_score = self.calculate_service_relevance(service, query, intent_result)
            scored_services.append({
                'service': service,
                'relevance_score': relevance_score
            })

        # Sort by relevance and return top results
        scored_services.sort(key=lambda x: x['relevance_score'], reverse=True)
        return scored_services[:limit]

    def calculate_service_relevance(self, service, query, intent_result):
        """Calculate relevance score for a service"""
        score = 0
        query_lower = query.lower()

        # Service name match (highest weight)
        if query_lower in service.service_name.lower():
            score += 1.0
        elif any(word in service.service_name.lower() for word in query_lower.split()):
            score += 0.7

        # Description match
        if query_lower in service.description.lower():
            score += 0.8
        elif any(word in service.description.lower() for word in query_lower.split()):
            score += 0.5

        # Department match
        if query_lower in service.department.lower():
            score += 0.6
        elif any(word in service.department.lower() for word in query_lower.split()):
            score += 0.4

        # Intent match bonus
        if intent_result['intent'] in service.service_type:
            score += 0.3

        # Boost verified services
        if service.is_verified:
            score += 0.2

        return min(score, 1.0)  # Cap at 1.0

    def generate_response(self, query, intent_result, services, documents):
        """Generate AI response based on search results using free AI models"""
        if not self.initialized:
            import asyncio
            asyncio.run(self.initialize())

        # Try AI-powered response generation first
        if self.summarizer:
            try:
                # Create context from top results
                context = self.build_response_context(query, services, documents, intent_result)

                # Use AI to generate a contextual response
                ai_response = self.summarizer(
                    context,
                    max_length=150,
                    min_length=50,
                    do_sample=True,
                    temperature=0.7
                )

                if ai_response and len(ai_response) > 0:
                    response_text = ai_response[0]['summary_text']
                    return {
                        'answer': response_text,
                        'intent': intent_result['intent'],
                        'confidence': intent_result['confidence'],
                        'total_services': len(services),
                        'total_documents': len(documents),
                        'ai_generated': True
                    }
            except Exception as e:
                print(f'AI response generation failed: {e}')

        # Fallback to template-based response
        return self.generate_response_template(query, intent_result, services, documents)

    def build_response_context(self, query, services, documents, intent_result):
        """Build context for AI response generation"""
        context_parts = [f"User query: {query}"]

        if services:
            top_service = services[0]['service']
            context_parts.append(f"Top matching service: {top_service.service_name} - {top_service.description}")

        if documents:
            top_doc = documents[0]['document']
            context_parts.append(f"Relevant document: {top_doc.title} - {top_doc.description}")

        context_parts.append(f"Detected intent: {intent_result['intent']} (confidence: {intent_result['confidence']:.2f})")

        return " ".join(context_parts)

    def generate_response_template(self, query, intent_result, services, documents):
        """Fallback template-based response generation"""
        response_templates = {
            'FINANCIAL': f"For financial assistance and scholarships, I recommend contacting the Financial Aid Office. They provide comprehensive information about grants, loans, work-study programs, and scholarship opportunities. You can find them in the Student Services Building, Room 110, or visit their website for detailed application procedures and deadlines.",

            'ACADEMIC': f"For academic support and library services, the University Library offers extensive resources for research and study. They provide access to academic databases, research assistance, study spaces, and technology support. The library is open 7 AM to 12 AM Monday-Thursday, 7 AM to 10 PM on Friday, 9 AM to 10 PM on Saturday, and 9 AM to 12 AM on Sunday.",

            'HEALTH': f"For health and medical services, the Student Health Center provides comprehensive healthcare services including medical care, counseling, and wellness programs. They offer immunizations, health education, and emergency services. The center is open Monday-Thursday 7 AM to 7 PM, Friday 7 AM to 5 PM, and Saturday 9 AM to 1 PM.",

            'CAREER': f"For career guidance and employment support, the Career Services Center offers assistance with career planning, job search strategies, resume writing, and interview preparation. They provide internship and job placement services, career counseling, and professional development workshops.",

            'HOUSING': f"For housing and accommodation services, the Housing Office manages on-campus residence halls and provides information about off-campus housing options. They offer support with roommate matching, housing applications, and maintenance requests.",

            'ADMINISTRATIVE': f"For administrative services and student records, the Academic Affairs Office handles academic policies, curriculum, and student academic support. They provide guidance on course registration and academic requirements.",

            'STUDENT_SERVICES': f"For general student services and support, the Student Services Office provides assistance with various student needs including orientation, student activities, and general guidance. They serve as a central hub for student support services.",

            'GENERAL': f"I found several services that might help with your query about '{query}'. Please provide more specific details about what you're looking for, and I'll give you more targeted assistance."
        }

        # Get the appropriate response template
        response_text = response_templates.get(intent_result['intent'], response_templates['GENERAL'])

        # If we have specific services, mention them
        if services and services[0]['relevance_score'] > 0.7:
            top_service = services[0]['service']
            response_text = f"Based on your query, I recommend contacting {top_service.service_name}. {response_text}"

        return {
            'answer': response_text,
            'intent': intent_result['intent'],
            'confidence': intent_result['confidence'],
            'total_services': len(services),
            'total_documents': len(documents),
            'ai_generated': False
        }

    def process_search(self, query):
        """Main search processing method"""
        # Classify intent
        intent_result = self.classify_intent(query)

        # Search services
        services = self.search_services(query, intent_result)

        # Search documents
        documents = self.search_documents(query, intent_result)

        # Generate response
        response_data = self.generate_response(query, intent_result, services, documents)

        return {
            'query': query,
            'intent': intent_result,
            'services': services,
            'documents': documents,
            'response': response_data
        }

# Singleton instance
ai_service = AIService()