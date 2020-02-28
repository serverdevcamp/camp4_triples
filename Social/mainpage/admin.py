from django.contrib import admin
#  Posts, Rooms,TrackGenres, TrackTypes, UsersHasTracks, WeeklyChart
from . import models
# Register your models here.
admin.site.register(models.Tracks)
admin.site.register(models.Users)
admin.site.register(models.Comments)
admin.site.register(models.Friends)
admin.site.register(models.Likes)
admin.site.register(models.Messages)
admin.site.register(models.Notifications)
admin.site.register(models.Posts)
admin.site.register(models.Rooms)
admin.site.register(models.TrackGenres)
admin.site.register(models.TrackTypes)
admin.site.register(models.UsersHasTracks)
