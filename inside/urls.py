from django.conf.urls import url, include
from . import views

urlpatterns = [
    url(r'^evaluate', views.evaluate, name="evaluate"),
    url(r"^multi-evaluate", views.evaluate_multi, name="evaluate_multi"),
    url(r"^answersheets", views.answersheets, name="answersheets"),
]
