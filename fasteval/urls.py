"""fasteval URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include, handler500
from django.contrib import admin
from django.conf import settings
admin.site.site_header = settings.ADMIN_SITE_HEADER
admin.site.site_title = settings.ADMIN_SITE_HEADER

handler500 = "outside.views.index"
urlpatterns = [
    url(r'^admin/', admin.site.urls),

    url(r'^', include("outside.urls")),
    url(r'^', include("auth0login.urls")),
    url(r"^", include("collect_paypal.urls")),

    url(r'^in/', include("inside.urls")),
    url(r'^prediction', include("prediction.urls")),
]
