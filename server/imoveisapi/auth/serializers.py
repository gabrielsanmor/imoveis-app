from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password

class LoginSerialiazer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls,user):
        token = super(LoginSerialiazer,cls).get_token(user)

        token['username']=user.username
        token['email']=user.email
        token['nome']=user.first_name
        token['sobrenome']=user.last_name
        return token

class CadastroSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(required=True,
    validators=[UniqueValidator(queryset=User.objects.all())])

    senha = serializers.CharField(write_only=True,required=True,validators=[validate_password])
    senha2 = serializers.CharField(write_only=True,required=True)

    class Meta:
        model=User
        fields=['username','senha','senha2','first_name','last_name','email']
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True}
        }
    
    def validate(self, attrs):
        if attrs['senha'] != attrs['senha2']:
            raise serializers.ValidationError({"senha":"As senhas não são íguais"})
        return attrs

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError({"username": "Esse usuário já está em uso"})
        return value


    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )

        user.set_password(validated_data['senha'])
        user.save()

        return user

class TrocarSenhaSerializer(serializers.ModelSerializer):
    senha_nova = serializers.CharField(write_only=True,required=True,validators=[validate_password])
    senha_nova2 = serializers.CharField(write_only=True,required=True)
    senha = serializers.CharField(write_only=True,required=True)
    
    class Meta:
        model = User
        fields =['senha_nova','senha_nova2','senha']
    
    def validate(self, attrs):
        if attrs['senha_nova'] != attrs['senha_nova2']:
            raise serializers.ValidationError({"senha_nova":"As senhas novas não são íguais"})
        return attrs
    
    def validate_senha(self,value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError({"senha":"A senha está incorreta"})
        return value
    
    def update(self, instance, validated_data):
        user = self.context['request'].user

        if user.pk != instance.pk:
            raise serializers.ValidationError({"authorize": "Você não tem permissão para esse usuário"})

        instance.setPassword(validated_data['senha'])
        instance.save()
        
        return instance
    
class AtualizarUsuarioSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    senha = serializers.CharField(required=True, write_only=True)

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email','senha')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
        }
    
    def validate_email(self,value):
        user = self.context['request'].user
        if User.objects.exclude(id=user.id).filter(email=value).exists():
            raise serializers.ValidationError({"email":"Esse email já está em uso"})

        return value

    def validate_username(self,value):
        user = self.context['request'].user
        if User.objects.exclude(id=user.id).filter(username=value).exists():
            raise serializers.ValidationError({"username":"Esse username já está em uso"})

        return value

    def validate_senha(self,value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError({"senha":"A senha está incorreta"})
        return value
    
    def update(self, instance, validated_data):
        user = self.context['request'].user

        if user.pk != instance.pk:
            raise serializers.ValidationError({"authorize": "Você não tem permissão para esse usuário"})

        instance.first_name = validated_data['first_name']
        instance.last_name = validated_data['last_name']
        instance.email = validated_data['email']
        instance.username = validated_data['username']

        instance.save()

        return instance