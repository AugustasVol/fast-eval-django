from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.conf import settings
# Create your views here.
from userdata.models import user_unlimited, get_credit
from collect_paypal.views import paypal_form

@login_required
def answersheets(request):
    context = {"collect_amount":settings.COLLECT_AMOUNT,
               "paypal_form":paypal_form(request)}
    return render(request, "inside/answersheets.html", context)

@login_required
def evaluate(request):
    user_id = request.user.id
    
    user_credit = get_credit(user_id)

    context = {"credit":user_credit,
               "collect_amount":settings.COLLECT_AMOUNT,
               "paypal_form":paypal_form(request)}
    return render(request, 'inside/eval.html', context)
