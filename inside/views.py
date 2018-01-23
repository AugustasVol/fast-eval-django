from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.conf import settings
# Create your views here.
from userdata.models import user_unlimited, get_credit
from auth0login.models import email_verified
from collect_paypal.views import paypal_form

def email_message(user):
    if email_verified(user):
        msg = "hidden"
    else:
        msg = "show"
    return msg

@login_required
def answersheets(request):
    user = request.user
    context = {"email_message": email_message(user),
               "username":request.user.username,
               "collect_amount":settings.COLLECT_AMOUNT,
               "paypal_form":paypal_form(request)}
    return render(request, "inside/answersheets.html", context)

@login_required
def evaluate(request):
    user = request.user
    user_id = request.user.id
    
    user_credit = get_credit(user_id)

    context = {"email_message": email_message(user),
               "username":request.user.username,
               "credit":user_credit,
               "collect_amount":settings.COLLECT_AMOUNT,
               "paypal_form":paypal_form(request)}
    return render(request, 'inside/eval.html', context)
