from django.urls import path
from . import views
urlpatterns = [
    # GET(READ)/POST(메세지 달기)
    path('<str:sender_id>/<str:receiver_id>', views.room, name='room'),
]