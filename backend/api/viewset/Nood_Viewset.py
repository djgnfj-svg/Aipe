from rest_framework import viewsets

#model
from nodes.models import Ai_Node

#API
from api.serializer.Nood_Serializer import Nood_Serializer

class Nood_Viewset(viewsets.ModelViewSet):
    serializer_class = Nood_Serializer
    queryset = Ai_Node.objects.order_by("-id")