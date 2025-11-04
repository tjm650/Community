from rest_framework import serializers

class TrendingSerializer(serializers.Serializer):
    query = serializers.CharField()
    count = serializers.IntegerField() 
    
    