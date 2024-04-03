from django.db import models

from base.model_base.TimeStampedModel import TimeStampedModel

# Create your models here.
class Ai_Category(models.Model):
    name = models.CharField(max_length=100)
    api = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Ai_Node(TimeStampedModel):
    name = models.CharField(max_length=100)
    prompt = models.TextField()
    category = models.ForeignKey(Ai_Category, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name