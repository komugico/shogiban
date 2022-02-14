from django.conf.urls import url
from rest_framework import routers

from .views import AuthRegister, AuthInfoGetView

urlpatterns = [
    url(r'auth/register/', AuthRegister.as_view()),
    url(r'auth/info/', AuthInfoGetView.as_view()),
]