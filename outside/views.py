from django.shortcuts import render
from django.conf import settings
# Create your views here.

def index(request):
    context = {"evaluation_price":str(float(settings.COLLECT_AMOUNT) / 100)}
    return render(request, 'outside/index.html', context)
