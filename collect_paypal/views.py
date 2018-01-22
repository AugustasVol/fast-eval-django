from django.shortcuts import render
from django.core.urlresolvers import reverse
from django.conf import settings
from paypal.standard.forms import PayPalPaymentsForm
# Create your views here.

def paypal_form(request):

    paypal_dict = {
        "business":settings.PAYPAL_RECEIVER_EMAIL,
        "amount":settings.COLLECT_AMOUNT,
        "item_name":"100 evaluations",
        "notify_url":request.build_absolute_uri(reverse("paypal-ipn")),
        "return_url":request.build_absolute_uri(reverse("evaluate")),
        "cancel_return":request.build_absolute_uri(reverse("evaluate")),
        "custom":str(request.user.id),
    }
    form = PayPalPaymentsForm(initial=paypal_dict)
    return form.render
