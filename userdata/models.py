from django.db import models

# Create your models here.
from django.contrib.auth.models import User

class credit(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    credit = models.IntegerField(default=50)
    unlimited = models.BooleanField(default=False)

    def __str__(self):
        return str(self.user)

def user_unlimited(user_id):
    return credit.objects.get_or_create(user_id=user_id)[0].unlimited
def get_credit(user_id):
    return credit.objects.get_or_create(user_id=user_id)[0].credit
def add_credit(user_id, added_number):
    credit_model = credit.objects.get_or_create(user_id=user_id)[0]
    if (credit_model.credit > 0):
        credit_model.credit = credit_model.credit + int(added_number)
        credit_model.save()
    return credit_model.credit