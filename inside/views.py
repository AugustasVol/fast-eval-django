from django.shortcuts import render
from django.contrib.auth.decorators import login_required
# Create your views here.
from userdata.models import user_unlimited, get_credit


@login_required
def answersheets(request):
    return render(request, "inside/answersheets.html")

@login_required
def evaluate(request):
    user_id = request.user.id
    
    user_credit = get_credit(user_id)

    data = {"credit":user_credit}
    return render(request, 'inside/eval.html', data)