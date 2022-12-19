from django.urls import path
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('login/', LoginView.as_view(), name='Login'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('cadastro/',CadastroView.as_view(),name='Cadastro',),
    path('trocar_senha/<int:pk>/',TrocarSenhaView.as_view(),name='Trocar Senha'),
    path('atualizar_usuario/<int:pk>/',AtualizarUsuarioView.as_view(),name='Atualizar Usuario'),
]