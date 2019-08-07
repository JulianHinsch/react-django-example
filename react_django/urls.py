from django.contrib import admin
from django.urls import include, path
from django.conf.urls import url
from rest_framework import routers
from books import views

router = routers.DefaultRouter()
router.register('authors', views.AuthorView, 'author')
router.register('books', views.BookView, 'book')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    # url(r'^', views.ClientView.as_view())
]
