from django.db import models

# Create your models here.

class Imovel(models.Model):
    
    exibicao = models.CharField(max_length=100)
    descricao = models.TextField()
    tipo = models.PositiveSmallIntegerField(default=1)
    area = models.PositiveBigIntegerField(default=100)
    logradouro = models.CharField(max_length=500)
    valor_compra = models.DecimalField(max_digits=15,decimal_places=2)
    valor_venda = models.DecimalField(max_digits=15,decimal_places=2, null=True,default=None)

    def __str__(self):
        return self.exibicao

class AnexoImovel(models.Model):

    imagem = models.ImageField(upload_to="imoveis", height_field=None, width_field=None, max_length=None)
    imovel = models.ForeignKey(Imovel, related_name="imagens", on_delete=models.CASCADE)

    def __str__(self):
        return str(self.imovel)+str(self.pk)
