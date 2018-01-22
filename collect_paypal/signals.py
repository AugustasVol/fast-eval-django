from django.dispatch import receiver

from paypal.standard.models import ST_PP_COMPLETED
from paypal.standard.ipn.signals import valid_ipn_received

from userdata.models import add_credit

@receiver(valid_ipn_received)
def react_to_pay(sender, **kwargs):
    ipn_obj = sender
    if ipn_obj.payment_status == ST_PP_COMPLETED:
        # WARNING !
        # Check that the receiver email is the same we previously
        # set on the `business` field. (The user could tamper with
        # that fields on the payment form before it goes to PayPal)
        if ipn_obj.receiver_email != "info-facilitator@fast-eval.com":
            # Not a valid payment
            return

        # ALSO: for the same reason, you need to check the amount
        # received, `custom` etc. are all what you expect or what
        # is allowed.
        print(ipn_obj.amount)
        print(ipn_obj.custom)
        add_credit(int(ipn_obj.custom), 100)

    else:
        return

