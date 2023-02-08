from django.db import models

# Create your models here.

class Card(models.Model):
    title = models.CharField(max_length=120)
    difficulty = models.IntegerField()
    category = models.CharField(max_length=120)
    description = models.CharField(max_length=256)

    def __str__():
        return self.title
