import base64
from django.core.files.base import ContentFile

from django.db.models import Q, Exists, OuterRef
from django.db.models.functions import Coalesce

from api.serializers import CommunityDirectorySerializer
from api.models import User, CommunityDirectory


def create_community_directory(consumer, data):
    user = consumer.scope['user']
    user_id = data.get('userId')
    username = data.get('username')
    code = data.get('code')
    email = data.get('email')
    bio = data.get('bio')
    directory_status1 = data.get('directory_status1')
    directory_status2 = data.get('directory_status2')
    directory_status3 = data.get('directory_status3')
    agreement = data.get('agreement')
    followers = data.get('followers')
    profile_imageB64 = data.get('profile_imageB64')
    profile_imageFileName = data.get('profile_imageFileName')
    cover_imageB64 = data.get('cover_imageB64')
    cover_imageFileName = data.get('cover_imageFileName')
    
    page = data.get('page')
    
    try:
        user_connection = User.objects.get(id = user_id)
        print("user_id==>", user_connection)
                    
    except User.DoesNotExist:
        print('Error: couldnt find user')
        return   
    
    if profile_imageB64 == None:
        Get_profile_image = profile_imageB64 = None 
        
        
    elif profile_imageB64:
        decoded_image = base64.b64decode(profile_imageB64)
        Get_profile_image = ContentFile(decoded_image, name=profile_imageFileName) 
        
    if cover_imageB64 == None:
        Get_cover_image = cover_imageB64 = None    
               
    elif cover_imageB64:
        decoded_image1 = base64.b64decode(cover_imageB64)
        Get_cover_image = ContentFile(decoded_image1, name=cover_imageFileName)        
    
    create = CommunityDirectory.objects.create(
        username= username,
        directory_status1= directory_status1,
        directory_status2= directory_status2,
        directory_status3= directory_status3,
        agreement= agreement,
        email= email,
        bio =  bio,
        code =  code,
        creator= user_connection,
        profile_image = Get_profile_image,
        cover_image = Get_cover_image,
    )
        
        # Serialized Messages
    CommunityDirectorySerializer(
            create,
            context={
                'user': user
            },
            many = True
        )
    

    # Send Back to the requesting user
    consumer.send_group(
            user.username, 'directory.create', data
        )


def receive_community_directory(consumer, data):
    user = consumer.scope['user']
    community_directory_id = data.get('directoryId')
    directory_status1 = data.get('directory_status1')
    page = data.get('page')
        
    # Get Messages
    CommunityDirectoryList = CommunityDirectory.objects.all(
        ).order_by('-created')
    
        
        # Serialized Messages
    serialized_community_directory = CommunityDirectorySerializer(
            CommunityDirectoryList,
            context={
                'user': user
            },
            many = True
        )
    
    data = {
        "directory_list": serialized_community_directory.data
    }
    
    # Send Back to the requesting user
    consumer.send_group(
            user.username, 'directory.list', data
        )
    
    
    