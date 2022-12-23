from django.shortcuts import render
from rest_framework import generics
from rest_framework import viewsets
from .models import Imovel,AnexoImovel
from .serializers import *
from rest_framework.parsers import FormParser, MultiPartParser,JSONParser
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
    permission_classes = [IsAuthenticated]
    queryset = Imovel.objects.all()
    serializer_class = ImovelSerializer

class AnexoImovelDetail(generics.RetrieveDestroyAPIView, viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    queryset = AnexoImovel.objects.all()
    serializer_class = ImovelAnexoSerializer
    
class AnexoImovelList(generics.ListAPIView, viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = ImovelAnexoSerializer
    
    def get_queryset(self):
        imovel = self.kwargs['imovel']
        return AnexoImovelList.objects.filter(imovel__id=imovel)

class AnexoImovelCreate(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = AnexoImovel.objects.all()
    parser_classes = (MultiPartParser, FormParser,)
    serializer_class = ImovelAnexoSerializer

    def perform_create(self, serializer):
        print(self.request.data)
        imovel = Imovel.objects.get(id=self.request.data.get('imovel'))
        serializer.save(imovel=imovel,imagem=self.request.data.get('imagem'))

class Dashboard(generics.ListAPIView,viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    queryset=Imovel.objects.all()[:1]
    serializer_class = DashboardSerializer