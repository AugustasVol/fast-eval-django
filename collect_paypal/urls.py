from django.conf.urls import url, include
from . import views

urlpatterns = [
    url(r"^paypal/", include("paypal.standard.ipn.urls")),
]
