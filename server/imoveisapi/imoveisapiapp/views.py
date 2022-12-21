from django.shortcuts import render
from rest_framework import generics
from rest_framework import viewsets
from .models import Imovel,AnexoImovel
from .serializers import *
from rest_framework.permissions import IsAuthenticated

# Create your views here.
class ImoveisList(generics.ListAPIView, viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Imovel.objects.all()
    serializer_class = ImovelSerializerMin

class ImoveisCreate(generics.CreateAPIView, viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Imovel.objects.all()
    serializer_class = ImovelSerializer

class ImoveisDetail(generics.RetrieveUpdateDestroyAPIView,viewsets.ViewSet):
    queryset = Imovel.objects.all()
    serializer_class = ImovelSerializer

class AnexoImovelDetail(generics.RetrieveDestroyAPIView, viewsets.ViewSet):
    queryset = AnexoImovel.objects.all()
    serializer_class = ImovelAnexoSerializer
    
class AnexoImovelList(generics.ListAPIView, viewsets.ViewSet):
    serializer_class = ImovelAnexoSerializer
    
    def get_queryset(self):
        imovel = self.kwargs['imovel']
        return AnexoImovelList.objects.filter(imovel__id=imovel)

class AnexoImovelCreate(generics.CreateAPIView, viewsets.ViewSet):
    queryset = AnexoImovel.objects.all()
    serializer_class = ImovelAnexoSerializer