from django.shortcuts import render
from django.conf import settings
# Create your views here.

def index(request):
    context = {"evaluation_price":str(float(settings.COLLECT_AMOUNT) / float(settings.BUNDLE_SIZE)),
               "bundle_size":settings.BUNDLE_SIZE}
    return render(request, 'outside/index.html', context)
