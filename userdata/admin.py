from django.contrib import admin

# Register your models here.
from .models import credit

class creditAdmin(admin.ModelAdmin):
    list_display = ('user', 'credit','unlimited')

admin.site.register(credit, creditAdmin)