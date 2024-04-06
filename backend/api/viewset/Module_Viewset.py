from rest_framework import viewsets, status
from rest_framework.response import Response
#model
from aimodules.models import Ai_Module
#API
from api.serializer.Module_Serializer import Module_Serializer

class Module_Viewset(viewsets.ModelViewSet):
    serializer_class = Module_Serializer
    queryset = Ai_Module.objects.order_by("-id")
    
    def create(self, request, *args, **kwargs):
        serializer = Module_Serializer(data=request.data)
        print(request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)