from django.views.generic import View
from django.http import HttpResponse
from django.conf import settings
from rest_framework import viewsets # provides CRUD operations
from .serializers import BookSerializer, AuthorSerializer
from .models import Author, Book

import os

class ClientView(View):
    def get(self, request):
        try:
            with open(os.path.join(settings.CLIENT_DIR, 'build', 'index.html')) as f:
                return HttpResponse(f.read())
        except FileNotFoundError:
            return HttpResponse(
                """
                This URL is only used when you have built the production
                version of the app. Visit http://localhost:3000/ instead, or
                run `yarn run build` to test the production version.
                """,
                status=501
            )

class BookView(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class AuthorView(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

