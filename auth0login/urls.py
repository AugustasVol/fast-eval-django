from django.conf.urls import url, include
from . import views

urlpatterns = [
    url(r'^', include(('django.contrib.auth.urls', "auth"), namespace='auth')),
    url(r'^', include(('social_django.urls', "social_django"), namespace='social')),
]
