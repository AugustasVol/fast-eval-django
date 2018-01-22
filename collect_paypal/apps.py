from django.apps import AppConfig


class CollectPaypalConfig(AppConfig):
    name = 'collect_paypal'

    def ready(self):
        from . import signals
