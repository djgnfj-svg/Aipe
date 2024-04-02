from django.db import models

from base.model_base.TimeStampedModel import TimeStampedModel

# Create your models here.
class ai_module(TimeStampedModel):
    name = models.CharField(max_length=100)
    description = models.TextField()
    shumnail = models.ImageField(upload_to='aimodules/thumnails')
    start_node = models.ForeignKey('nodes.Ai_nodes', on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name