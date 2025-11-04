from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework import status


from .serializers import PostSerializer
from .models import Post

# Create your views here.
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    parser_classes = (MultiPartParser, FormParser)

    def create(self, request, *args, **kwargs):
        username = request.data["username"]
        name = request.data["name"]
        image = request.data["image"]
        description = request.data["description"]
        email = request.data["email"]
        year = request.data["year"]
        Post.objects.create(username=username, name=name, image=image, description=description, email=email, year=year)
        return Response("Post Created Successfully", status=status.HTTP_200_OK)   
    
