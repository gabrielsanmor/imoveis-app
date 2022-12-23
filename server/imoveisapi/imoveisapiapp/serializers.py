from .models import Imovel,AnexoImovel
from django.db.models import Max,Q,F,Sum
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
        fields = ['id','exibicao','descricao','area','logradouro','valor_compra','valor_venda','imagens']
    
    def get_imagens(self,obj):
        request = self.context.get('request')
        aux = AnexoImovel.objects.filter(imovel=obj).first()
        if(aux):
            aux = ImovelAnexoSerializer(aux).data
            aux['imagem']= request.build_absolute_uri(aux['imagem'])
            return [aux]
        else:
            return [None]

class DashboardSerializer(serializers.Serializer):
    
    maior_lucro = serializers.SerializerMethodField()
    quantidade = serializers.SerializerMethodField()
    em_estoque= serializers.SerializerMethodField()
    mais_recente = serializers.SerializerMethodField()
    lucro_total = serializers.SerializerMethodField()
    
    class Meta:
        fields = ['maior_lucro','quantidade','em_estoque','mais_recente','lucro_total']

    def get_maior_lucro(self,obj):
        aux=Imovel.objects.filter(~Q(valor_venda=None)).annotate(lucro=F('valor_venda')/F('valor_compra')).order_by('-lucro').first()
        return ImovelSerializer(aux).data
    
    def get_quantidade(self,obj):
        aux=Imovel.objects.count()
        return aux
    
    def get_em_estoque(self,obj):
        aux=Imovel.objects.filter(valor_venda=None).count()
        return aux

    def get_mais_recente(self,obj):
        aux=Imovel.objects.all().order_by('id').reverse()[:20]
        dat=[]
        for i in aux:
            dat.append(ImovelSerializer(i).data)
        return dat

    def get_lucro_total(self,obj):
        aux=Imovel.objects.filter().annotate(lucro=F('valor_venda')/F('valor_compra')).aggregate(lucroT=Sum('lucro'))
        return aux