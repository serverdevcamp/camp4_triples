from django.urls import path
from . import views
urlpatterns = [
    #profile/
    # GET(READ)
    # 프로필 정보 all
    path('<user_id>/', views.profile, name='profile'),
    # path('', views.profile, name='profile'),

    # 업로드된 mr
    path('mr/<str:user_id>/', views.mr, name='mr'),
    # 업로드된 완성곡
    path('songs/<str:user_id>/', views.songs, name='songs'),
    # user 가 좋아요 누른 곡
    path('likes/<str:user_id>/', views.likes, name='likes'),
    # user 가 팔로우한 사람 리스트
    path('followings/<str:user_id>/', views.followings, name='followings'),
    # user 를 팔로우 하는 사람 리스트
    path('followers/<str:user_id>/', views.followers, name='followers'),
    # user 한테 단 댓글 모음
    path('comments/<str:user_id>/', views.comments, name='comments'),
    # 음악 세부 정보
    path('<str:user_id>/<int:post_id>/', views.track_detail, name='track_detail'),
    # POST
    # 음악 세부 정보 수정
    path('<str:user_id>/<int:post_id>/edit/', views.edit_post, name='edit_post'),
    path('<str:user_id>/<int:post_id>/remove/', views.delete_post, name="delete_post"),
    path('<str:user_id>/<int:post_id>/comment/', views.post_comment, name="post_comment"),
    path('<str:user_id>/<int:post_id>/comment/<int:comment_id>/remove/', views.delete_comment, name="delete_comment"),

    path('play_count/', views.play_count, name='play_count')
]