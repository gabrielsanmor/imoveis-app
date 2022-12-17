from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class ObterTokenSerialiazer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls,user):
        token = super(ObterTokenSerialiazer,cls).get_token(user)

        token['username']=user.username
        token['email']=user.email
        token['nome']=user.first_name
        token['sobrenome']=user.last_name
        return token