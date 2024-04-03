from rest_framework import viewsets

#model
from aimodules.models import Ai_Module
#API
from api.serializer.Module_Serializer import Module_Serializer

class Module_Viewset(viewsets.ModelViewSet):
    serializer_class = Module_Serializer
    queryset = Ai_Module.objects.order_by("-id")