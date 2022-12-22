from .models import Imovel,AnexoImovel
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class ImovelAnexoSerializer(serializers.ModelSerializer):
    imagem = serializers.ImageField()

    class Meta:
        model = AnexoImovel
        fields = ['id','imagem']

class ImovelSerializer(serializers.ModelSerializer):
    imagens = ImovelAnexoSerializer(many=True,read_only=True)

    class Meta:
        model = Imovel
        fields = ['id','exibicao','descricao','area','logradouro','valor_compra','valor_venda','imagens']

class ImovelSerializerMin(serializers.ModelSerializer):
    imagens = serializers.SerializerMethodField()

    class Meta:
        model = Imovel
        fields = ['exibicao','descricao','area','logradouro','valor_compra','valor_venda','imagens']
    
    def get_imagens(self,obj):
        request = self.context.get('request')
        aux = AnexoImovel.objects.filter(imovel=obj).first()
        if(aux):
            aux = ImovelAnexoSerializer(aux).data
            aux['imagem']= request.build_absolute_uri(aux['imagem'])
            return [aux]
        else:
            return [None]