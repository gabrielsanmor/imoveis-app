from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny
from .serializers import ObterTokenSerialiazer

# Create your views here.

class ObterTokenView(TokenObtainPairView):
    permission_classes=(AllowAny,)
    serializer_class=ObterTokenSerialiazer