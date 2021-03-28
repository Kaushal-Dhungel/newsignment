from django.urls import path
from .views import *
from django.conf import settings

react_routes = getattr(settings, 'REACT_ROUTES', [])

urlpatterns = [
    path('',home, name = 'home'),
]

for route in react_routes:
    urlpatterns += [
        path(f'{route}',home, name = 'home'),
    ]