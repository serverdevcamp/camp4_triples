from django.urls import path
from . import views
urlpatterns = [
    path('', views.real_time, name='real_time'),
]