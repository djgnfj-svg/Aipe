from rest_framework import serializers

from nodes.models import Ai_Node

class Nood_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Ai_Node
        exclude = ('created_at', 'updated_at')