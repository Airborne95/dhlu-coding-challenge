from .models import User

from .serializer import *
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

"""
I did a bit of a refactor of this file to use rest_framework as this was more comfortable for me.
"""
# Create your views here.
@api_view(['GET'])
def index(request):
    users = User.objects.all()
    serializer = UserSerializer(users, context={'request': request}, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def add(request):
    serializer = UserSerializer(data=request.data)
    if(serializer.is_valid()):
        serializer.save()
        return Response(status=status.HTTP_201_CREATED)

    return Response(serializer.erros, status=status.HTTP_400_BAD_REQUEST)
