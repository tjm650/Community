from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework import status

from .models import Bloger as Blog
from .serializers import BlogSerializer

# Create your views here.
class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    parser_classes = (MultiPartParser, FormParser)

    def create(self, request, *args, **kwargs):
        username = request.data["username"]
        name = request.data["name"]
        email = request.data["email"]
        image = request.data["image"]
        description = request.data["description"]
        tags = request.data["tags"]
        department = request.data["department"]
        Blog.objects.create(username=username, name=name, email= email, image=image, description=description, tags=tags, department=department)
        return Response("Blog Created Successfully", status=status.HTTP_200_OK)
    
