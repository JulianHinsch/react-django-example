from django.db import models

# Create your models here.

class Author(models.Model):
    name = models.CharField('Name', max_length = 200)
    objects = models.Manager()

    def __str__(self):
        return self.name

class Book(models.Model):
    title = models.CharField('Title', max_length = 200)
    author = models.ForeignKey(Author, on_delete = models.CASCADE)
    date_published = models.DateField('Date Published')
    objects = models.Manager()
    def __str__(self):
        return self.title


