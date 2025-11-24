# Quercus Gemini Integration Documentation

## Overview

This document describes the comprehensive Gemini API integration for the Quercus AI assistant, following the official [Gemini API documentation](https://ai.google.dev/gemini-api/docs).

## Features

### ✅ Core Features Implemented

1. **Enhanced AI Response Generation**
   - Context-aware prompting with conversation history
   - User preference integration (response style, context)
   - Advanced generation configuration (temperature, top-k, top-p)

2. **Multi-Modal Capabilities**
   - **Text Analysis**: General AI conversations and assistance
   - **Image Analysis**: Using `gemini-pro-vision` for visual content
   - **Document Processing**: PDF, text, and academic document analysis

3. **Advanced Conversation Management**
   - Conversation summarization and insights
   - Learning progression analysis
   - Export functionality (JSON/TXT formats)

4. **Analytics and Monitoring**
   - Usage tracking and cost estimation
   - Performance monitoring
   - User behavior insights

5. **Safety and Rate Limiting**
   - Content safety filtering
   - Intelligent rate limiting
   - Cost management

## API Endpoints

### Core AI Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/quercus/ai/generate/` | POST | Generate AI responses with enhanced context |
| `/api/quercus/conversations/` | GET | List user conversations |
| `/api/quercus/settings/` | GET/POST | Manage AI settings |

### Advanced Features

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/quercus/image/analyze/` | POST | Analyze images using Gemini Vision |
| `/api/quercus/document/analyze/` | POST | Process and analyze documents |
| `/api/quercus/conversations/{id}/summary/` | GET | Generate conversation summaries |
| `/api/quercus/conversations/{id}/insights/` | GET | Get detailed conversation insights |
| `/api/quercus/conversations/export/` | POST | Export conversations |
| `/api/quercus/analytics/` | GET | Usage analytics and monitoring |
| `/api/quercus/suggestions/` | GET | AI-powered conversation suggestions |

## Configuration

### Environment Variables

```bash
# Required
GEMINI_API_KEY=your_gemini_api_key_here

# Optional
QUERCUS_SETTINGS_MAX_CONVERSATIONS_PER_USER=100
QUERCUS_SETTINGS_AI_MODEL_TIMEOUT=30
```

### Django Settings

The following settings are automatically configured:

```python
# Gemini API Configuration
GEMINI_CONFIG = {
    'DEFAULT_MODEL': 'gemini-pro',
    'VISION_MODEL': 'gemini-pro-vision',
    'MAX_RETRIES': 3,
    'TIMEOUT_SECONDS': 30,
    'MAX_TOKENS': 2048,
    'TEMPERATURE': 0.7,
    'TOP_K': 40,
    'TOP_P': 0.95,
}

# Safety Settings
GEMINI_SAFETY_SETTINGS = [
    {
        "category": "HARM_CATEGORY_HARASSMENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    # ... additional safety settings
]

# Rate Limiting
QUERCUS_RATE_LIMITS = {
    'AI_GENERATE': {'requests': 20, 'window_minutes': 60},
    'IMAGE_ANALYZE': {'requests': 5, 'window_minutes': 60},
    'DOCUMENT_ANALYZE': {'requests': 10, 'window_minutes': 60},
    # ... additional limits
}
```

## Usage Examples

### Basic AI Query

```python
import requests

response = requests.post('http://localhost:8000/api/quercus/ai/generate/', json={
    'prompt': 'Help me understand calculus concepts',
    'context': 'study',
    'conversation_id': 'optional_conversation_id'
})

if response.status_code == 200:
    data = response.json()
    print(f"AI Response: {data['response']}")
    print(f"Conversation ID: {data['conversation_id']}")
```

### Image Analysis

```python
import requests
import base64

# Read and encode image
with open('image.jpg', 'rb') as image_file:
    image_data = base64.b64encode(image_file.read()).decode('utf-8')

response = requests.post('http://localhost:8000/api/quercus/image/analyze/', json={
    'image_data': f'data:image/jpeg;base64,{image_data}',
    'prompt': 'Analyze this academic diagram',
    'context': 'image_analysis'
})
```

### Document Analysis

```python
import requests

response = requests.post('http://localhost:8000/api/quercus/document/analyze/', json={
    'document_data': 'Content of the academic paper...',
    'document_type': 'text',
    'prompt': 'Summarize the key findings of this research paper'
})
```

### Conversation Analytics

```python
import requests

response = requests.get('http://localhost:8000/api/quercus/analytics/?days=30')
data = response.json()

print(f"Total Queries: {data['analytics']['summary']['total_queries']}")
print(f"Most Active Context: {data['analytics']['summary']['most_active_context']}")
print(f"Estimated Cost: ${data['analytics']['cost_estimate']['estimated_monthly_cost']}")
```

## Models and Database Schema

### Enhanced QuercusMessage Model

The message model now includes comprehensive Gemini integration fields:

```python
class QuercusMessage(models.Model):
    # Original fields
    conversation = models.ForeignKey(QuercusConversation, on_delete=models.CASCADE)
    content = models.TextField()
    is_user = models.BooleanField(default=False)
    timestamp = models.DateTimeField(default=timezone.now)

    # Enhanced Gemini fields
    model_used = models.CharField(max_length=50, default='gemini-pro')
    tokens_used = models.IntegerField(default=0)
    response_time_ms = models.IntegerField(default=0)
    prompt_tokens = models.IntegerField(default=0)
    completion_tokens = models.IntegerField(default=0)
    total_tokens = models.IntegerField(default=0)
    generation_config = models.JSONField(default=dict)
    safety_ratings = models.JSONField(default=list)
    finish_reason = models.CharField(max_length=50, blank=True)
```

## Safety and Content Filtering

The integration implements comprehensive safety settings:

- **Harassment Protection**: Blocks harmful or harassing content
- **Hate Speech Prevention**: Filters discriminatory language
- **Explicit Content Blocking**: Prevents inappropriate material
- **Dangerous Content Detection**: Stops harmful instructions

## Rate Limiting

Intelligent rate limiting is implemented with different limits for different operations:

- **AI Generation**: 20 requests per hour
- **Image Analysis**: 5 requests per hour
- **Document Analysis**: 10 requests per hour
- **Study Plans**: 15 requests per hour
- **Career Guidance**: 10 requests per hour

## Cost Management

The system includes built-in cost monitoring:

- **Token Tracking**: Monitors input and output tokens
- **Cost Estimation**: Calculates approximate API costs
- **Usage Analytics**: Provides insights into usage patterns
- **Budget Monitoring**: Helps manage API expenses

## Error Handling

Comprehensive error handling includes:

- **API Key Validation**: Ensures proper configuration
- **Network Timeouts**: Handles API connectivity issues
- **Rate Limit Handling**: Graceful degradation when limits are exceeded
- **Fallback Responses**: Provides alternative responses when AI is unavailable

## Best Practices

### For Developers

1. **API Key Security**: Store API keys securely using environment variables
2. **Error Handling**: Always implement proper error handling for API calls
3. **Rate Limiting**: Respect rate limits to avoid service disruption
4. **Cost Monitoring**: Track usage to manage costs effectively

### For Users

1. **Context Provision**: Provide clear context for better AI responses
2. **Content Guidelines**: Follow content safety guidelines
3. **Usage Monitoring**: Check analytics to understand usage patterns
4. **Feature Exploration**: Utilize all available features for enhanced experience

## Troubleshooting

### Common Issues

1. **API Key Not Configured**
   ```python
   # Check if API key is properly set
   from quercus.gemini_config import validate_gemini_setup
   print(validate_gemini_setup())  # Should return True
   ```

2. **Rate Limit Exceeded**
   ```json
   {
     "success": false,
     "error": "Rate limit exceeded",
     "retry_after": 3600
   }
   ```

3. **Safety Filter Triggered**
   ```json
   {
     "success": false,
     "error": "Content blocked by safety filters",
     "reason": "inappropriate_content"
   }
   ```

## Future Enhancements

Planned improvements based on Gemini API roadmap:

1. **Function Calling**: Enable AI to call external functions
2. **Streaming Responses**: Real-time response streaming
3. **Advanced Vision**: Enhanced image understanding capabilities
4. **Multi-Modal Integration**: Combine text, image, and document analysis
5. **Custom Model Tuning**: Fine-tune models for specific educational contexts

## Support

For technical support and questions:

1. Check the [official Gemini API documentation](https://ai.google.dev/gemini-api/docs)
2. Review application logs for detailed error information
3. Monitor usage analytics for performance insights
4. Ensure API key is valid and has sufficient quota

---

**Last Updated**: October 2025
**Gemini API Version**: Latest
**Documentation Status**: Complete ✅