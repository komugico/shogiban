from django.conf.urls import url, include
from rest_framework import routers

from .views import TaikyokuViewSet, KifuViewSet


router = routers.DefaultRouter()
router.register(r'taikyoku', TaikyokuViewSet)
router.register(r'kifu', KifuViewSet)

urlpatterns = [
    url(r'',  include(router.urls)),
]