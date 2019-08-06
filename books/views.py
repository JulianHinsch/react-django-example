from django.http import JsonResponse
from rest_framework import viewsets # provides CRUD operations
from .serializers import BookSerializer, AuthorSerializer
from .models import Author, Book

class BookView(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class AuthorView(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

