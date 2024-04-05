from django.db import models

from base.model_base.TimeStampedModel import TimeStampedModel

# Create your models here.
class Ai_Module(TimeStampedModel):
    name = models.CharField(max_length=100)
    description = models.TextField()
    shumnail = models.ImageField(upload_to='images/', default='images/gear.png')
    # start_node = models.ForeignKey('nodes.Ai_node', on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name