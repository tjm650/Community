"""
Gemini API Configuration Module
Enhanced configuration using new Google GenAI client
https://ai.google.dev/gemini-api/docs
"""

import os
from django.conf import settings
from typing import Dict, Any, Optional
import logging
from decouple import config

# Import the new Google GenAI client
try:
    from google import genai
except ImportError:
    genai = None 

logger = logging.getLogger(__name__)

class GeminiConfig:
    """Enhanced Gemini API configuration class using new Google GenAI client"""

    def __init__(self):
        # Try to get API key from environment first, then Django settings
        self.api_key = config('GEMINI_API_KEY', default=getattr(settings, 'GEMINI_API_KEY', None))
        self.config = getattr(settings, 'GEMINI_CONFIG', {})
        self.safety_settings = getattr(settings, 'GEMINI_SAFETY_SETTINGS', [])
        self.client = None
        self._initialize_client()
 
    def _initialize_client(self):
        """Initialize the Google GenAI client"""
        if genai and self.api_key and self.validate_api_key():
            try:
                self.client = genai.Client(api_key=self.api_key)
                logger.info("Gemini client initialized successfully")
            except Exception as e:
                logger.error(f"Failed to initialize Gemini client: {e}")
                self.client = None
        else:
            logger.warning("Gemini client not initialized - API key missing or invalid")

    def get_client(self):
        """Get the initialized Gemini client"""
        return self.client

    def get_model_config(self, model_type: str = 'text') -> Dict[str, Any]:
        """Get model configuration based on type"""
        base_config = {
            'model_name': 'gemini-2.5-flash',  # Use the specified model
            'timeout': self.config.get('TIMEOUT_SECONDS', 30),
            'max_retries': self.config.get('MAX_RETRIES', 3),
        }

        return base_config

    def get_generation_config(self) -> Dict[str, Any]:
        """Get generation configuration for Gemini API"""
        return {
            'temperature': self.config.get('TEMPERATURE', 0.7),
            'top_k': self.config.get('TOP_K', 40),
            'top_p': self.config.get('TOP_P', 0.95),
            'max_output_tokens': self.config.get('MAX_TOKENS', 2048),
            'candidate_count': 1,
        }

    def get_safety_settings(self) -> list:
        """Get safety settings for content filtering"""
        return self.safety_settings or [
            {
                "category": "HARM_CATEGORY_HARASSMENT",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
                "category": "HARM_CATEGORY_HATE_SPEECH",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
                "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
                "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE"
            }
        ]

    def validate_api_key(self) -> bool:
        """Validate Gemini API key"""
        if not self.api_key or self.api_key == 'your-gemini-api-key-here':
            logger.error("Gemini API key not configured properly")
            return False
        return True

    def get_estimated_cost(self, tokens: int) -> float:
        """Calculate estimated cost for API usage"""
        # Gemini 2.5 Flash pricing: $0.000075 per 1K tokens for input, $0.0003 per 1K tokens for output
        return (tokens / 1000) * 0.00015  # Average approximate cost

    def get_context_limits(self) -> Dict[str, int]:
        """Get context window limits for different models"""
        return {
            'gemini-2.5-flash': 1048576,  # 1M tokens context window
            'gemini-2.5-flash': 2097152,    # 2M tokens (much larger context window)
            'gemini-1.5-flash': 1048576,  # 1M tokens
            'gemini-pro': 30720,          # 30K tokens (legacy)
            'gemini-pro-vision': 16384,   # 16K tokens (legacy)
        }

# Global configuration instance
gemini_config = GeminiConfig()

# Convenience functions
def get_gemini_config() -> GeminiConfig:
    """Get Gemini configuration instance"""
    return gemini_config

def validate_gemini_setup() -> bool:
    """Validate complete Gemini setup"""
    return gemini_config.validate_api_key()

def get_model_for_context(context: str) -> str:
    """Get appropriate model for given context"""
    context_model_map = {
        'image_analysis': 'gemini-2.5-flash',  # Updated to use new model
        'document_analysis': 'gemini-2.5-flash',
        'study': 'gemini-2.5-flash',
        'campus': 'gemini-2.5-flash',
        'career': 'gemini-2.5-flash',
        'schedule': 'gemini-2.5-flash',
        'research': 'gemini-2.5-flash',
    }
    return context_model_map.get(context, 'gemini-2.5-flash')