from rest_framework import serializers

from .models import Message, TagedMessage


class MessageSerializer(serializers.ModelSerializer):
    is_me = serializers.SerializerMethodField()
    # taged_message = serializers.SerializerMethodField()
     
    class Meta:
        model = Message
        fields = [
            'id',
            'is_me',
            'description',
            'created',
            'red',
            'image',
            'taged_message'
        ]
        
    def get_is_me(self, obj):
        return self.context['user'] == obj.sender 
    
    # def get_taged_message(self, obj):
    #     if not hasattr(obj, "not_taged"):
    #         date = obj.taged_message
    #     else:
    #         date = obj.taged_message
    #     # taged_message = obj.taged_message.filter()   #.all().order_by("-created")[:1]  # Get latest 3 comments
    #     return TagedMessageSerializer(date, context=self.context).data

    
# class TagedMessageSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = TagedMessage
#         fields = [
#             "id",
#             "message",
#             "created",
#         ]