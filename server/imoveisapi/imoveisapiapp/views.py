from django.shortcuts import render
from rest_framework import generics
from rest_framework import viewsets
from .models import Imovel,AnexoImovel
from .serializers import *
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated

# Create your views here.
class ImoveisList(generics.ListCreateAPIView, viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Imovel.objects.all()
    serializer_class = ImovelSerializerMin

class ImoveisDetail(generics.RetrieveUpdateDestroyAPIView,viewsets.ViewSet):
    queryset = Imovel.objects.all()
    serializer_class = ImovelSerializer

class AnexoImovel(generics.RetrieveDestroyAPIView, viewsets.ViewSet):
    queryset = AnexoImovel.objects.all()
    serializer_class = ImovelAnexoSerializer
