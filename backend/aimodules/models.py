from django.db import models

from base.model_base.TimeStampedModel import TimeStampedModel

# Create your models here.
class Ai_Module(TimeStampedModel):
    name = models.CharField(max_length=100)
    description = models.TextField()
    thumbnail = models.ImageField(upload_to='images/', default='images/gear.png')
    
    def __str__(self):
        return self.name