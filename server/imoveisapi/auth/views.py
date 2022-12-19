from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.viewsets import generics
from django.contrib.auth.models import User
from .serializers import *

# Create your views here.

class LoginView(TokenObtainPairView):
    permission_classes=(AllowAny,)
    serializer_class=LoginSerialiazer

class CadastroView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = CadastroSerializer

class TrocarSenhaView(generics.UpdateAPIView):
    queryset = User.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = TrocarSenhaSerializer

class AtualizarUsuarioView(generics.UpdateAPIView):
    queryset = User.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = AtualizarUsuarioSerializer