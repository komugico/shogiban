from django.contrib.auth import authenticate
from django.db import transaction
from django.http import HttpResponse, Http404
from rest_framework import authentication, permissions, generics
from rest_framework_jwt.settings import api_settings
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from rest_framework import status, viewsets, filters

from .models import Player, PlayerManager
from .serializers import PlayerSerializer

# ユーザ作成のView(POST)
class AuthRegister(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer

    @transaction.atomic
    def post(self, request, format=None):
        serializer = PlayerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ユーザ情報取得のView(GET)
class AuthInfoGetView(generics.RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer

    def get(self, request, format=None):
        return Response(data={
                'id': request.user.id,
                'username': request.user.username,
                'rating': request.user.rating,
                'is_cpu': request.user.is_cpu,
            },
            status=status.HTTP_200_OK)