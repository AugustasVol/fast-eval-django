from django.shortcuts import render
from django.http import JsonResponse
import ujson as json
import numpy as np
from django.conf import settings
from userdata.models import get_credit, add_credit, user_unlimited
from auth0login.models import email_verified
from written_test_automation import result
from written_test_automation import pre

def no_prediction(request):
    response = {"predicted":False}
    return JsonResponse(response)

def predict(request):
    if not request.method == "POST":
        return no_prediction(request)

    user = request.user
    if not user.is_authenticated:
        return no_prediction(request)

    if not email_verified(user):
        return no_prediction(request)

    user_id = user.id
    credit = get_credit(user_id)
    if not ((credit > 0) or user_unlimited(user_id)):
        return no_prediction(request)
    json_content = json.loads(request.body.decode("utf-8"))
    image = pre.imread_uri(json_content["image_uri"])
    collect_data = json_content["collect"]
    #print("collect", collect_data)
    try:
        if collect_data:
            raw_prediction = result.predict(image, save_some_percent=True, save_path=settings.SAVE_PATH)
        else:
            raw_prediction = result.predict(image)

        prediction = list(map( lambda x: int(x) ,list(np.argmax(raw_prediction, axis=1))))

        credit = add_credit(user_id, -1)

        response = {"predicted":True,
                    "prediction":prediction,
                    "credit":credit }
        return JsonResponse(response)
        
    except:
        return no_prediction(request)
