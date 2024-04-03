from rest_framework import serializers

from aimodules.models import Ai_Module

class Module_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Ai_Module
        exclude = ('created_at', 'updated_at')