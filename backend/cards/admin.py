from django.contrib import admin
from .models import Card

# Register your models here.

class CardAdmin(admin.ModelAdmin):
    list_display = ('title', 'difficulty', 'category')

admin.site.register(Card, CardAdmin)
