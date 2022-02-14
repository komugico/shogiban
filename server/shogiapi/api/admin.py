from django.contrib import admin

from .models import Kifu, Taikyoku

@admin.register(Taikyoku)
class Taikyoku(admin.ModelAdmin):
    pass

@admin.register(Kifu)
class Kifu(admin.ModelAdmin):
    pass