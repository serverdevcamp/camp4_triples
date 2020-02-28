from django.urls import path
from . import views
urlpatterns = [
    # POST
    path('', views.fileupload, name='fileupload'),
    path('post/', views.postupload, name='postupload'),
]