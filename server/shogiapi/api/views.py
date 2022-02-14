from django.shortcuts import render
from django.contrib.auth import authenticate
from django.db import transaction
from django.http import HttpResponse, Http404
from rest_framework import authentication, permissions, generics
from rest_framework_jwt.settings import api_settings
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from rest_framework import status, viewsets, filters

from .models import Taikyoku, Kifu
from .serializers import TaikyokuSerializer, KifuSerializer


class TaikyokuViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Taikyoku.objects.all()
    serializer_class = TaikyokuSerializer
    filter_fields = ('id', 'sente', 'gote', 'status', 'teai', 'start', 'end')

class KifuViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Kifu.objects.all()
    serializer_class = KifuSerializer
    filter_fields = ('id', 'taikyoku', 'kyokumen', 'turn', 'before')