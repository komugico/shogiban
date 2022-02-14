from django.conf.urls import url
from rest_framework import routers

from .views import TaikyokuViewSet, KifuViewSet

urlpatterns = [
    url(r'taikyoku', TaikyokuViewSet),
    url(r'kifu', KifuViewSet),
]