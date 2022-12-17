from django.shortcuts import render
from rest_framework import generics
from rest_framework import viewsets
from .models import Imovel,AnexoImovel
from .serializers import *

# Create your views here.
class ImoveisList(generics.ListCreateAPIView, viewsets.ViewSet):
    queryset = Imovel.objects.all()
    serializer_class = ImovelSerializerMin

class ImoveisDetail(generics.RetrieveUpdateDestroyAPIView,viewsets.ViewSet):
    queryset = Imovel.objects.all()
    serializer_class = ImovelSerializer

class AnexoImovel(generics.RetrieveDestroyAPIView, viewsets.ViewSet):
    queryset = AnexoImovel.objects.all()
    serializer_class = ImovelAnexoSerializer