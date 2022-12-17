from .models import Imovel,AnexoImovel
from rest_framework import serializers

class ImovelAnexoSerializer(serializers.ModelSerializer):
    imagem = serializers.FileField()

    class Meta:
        model = AnexoImovel
        fields = ['id','imagem']

class ImovelSerializer(serializers.ModelSerializer):
    imagens = ImovelAnexoSerializer(many=True,read_only=True)

    class Meta:
        model = Imovel
        fields = ['id','exibicao','descricao','tipo','area','logradouro','valor_compra','valor_venda','imagens']

class ImovelSerializerMin(serializers.ModelSerializer):
    imagens = serializers.SerializerMethodField()

    class Meta:
        model = Imovel
        fields = ['exibicao','descricao','tipo','area','logradouro','valor_compra','valor_venda','imagens']
    
    def get_img(self,obj):
        request = self.context.get('request')
        aux = AnexoImovel.objects.filter(imovel=obj).first()
        return ImovelAnexoSerializer(aux).data