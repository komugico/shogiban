from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.utils.translation import ugettext_lazy as _
from django.utils import timezone

class PlayerManager(BaseUserManager):
    def create_user(self, request_data, **kwargs):
        now = timezone.now()

        user = self.model(
            username=request_data['username'],
            is_active=True,
            last_login=now,
            date_joined=now
        )

        user.set_password(request_data['password'])
        user.save(using=self._db)
        
        return user

    def create_superuser(self, username, password, **extra_fields):
        request_data = {
            'username': username,
            'password': password
        }
        user = self.create_user(request_data)
        user.is_superuser = True
        user.is_active = True
        user.is_staff = True
        user.is_admin = True
        user.save(using=self._db)

        return user


class Player(AbstractBaseUser, PermissionsMixin):
    username    = models.CharField(_('username'), max_length=30, unique=True)
    rating      = models.IntegerField(default=1000)
    is_cpu      = models.BooleanField(default=False)
    is_active   = models.BooleanField(default=True)
    is_staff    = models.BooleanField(default=False)
    is_admin    = models.BooleanField(default=False)
    date_joined = models.DateTimeField(_('date joined'), default=timezone.now)

    objects = PlayerManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []
    
    def __repr__(self):
        return "{}: {}".format(self.pk, self.username)

    __str__ = __repr__