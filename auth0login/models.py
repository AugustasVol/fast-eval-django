from django.db import models

# Create your models here.

def email_verified(user):
    ''' check if user email is verified '''
    auth0user = user.social_auth.get(provider="auth0")
    verified = auth0user.extra_data["email_verified"]
    return verified

