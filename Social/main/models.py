# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models

import datetime


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class CommentsManager(models.Manager):

    def get_user_comment_counts(self, user):
        qs = Comments.objects.filter(users_idx=user)
        return qs.count()


class Comments(models.Model):
    idx = models.AutoField(primary_key=True)
    contents = models.CharField(max_length=225)
    users_idx = models.ForeignKey('Users', models.DO_NOTHING, db_column='users_idx')
    posts_idx = models.ForeignKey('Posts', models.DO_NOTHING, db_column='posts_idx')
    created_dt = models.DateTimeField(default=datetime.datetime.utcnow())

    objects = CommentsManager()

    class Meta:
        managed = False
        db_table = 'comments'
        ordering = ['-created_dt']

    def approve(self):
        self.approved_comment = True
        self.save()

    def __str__(self):
        return self.contents


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'



# class Friends(models.Model):
#     idx = models.AutoField(primary_key=True)
#     sender_idx = models.ForeignKey('Users', models.DO_NOTHING, db_column='sender_idx', related_name='fk_friends_1')
#     receiver_idx = models.ForeignKey('Users', models.DO_NOTHING, db_column='receiver_idx', related_name='fk_friends_2')
#     created_dt = models.DateTimeField(default=datetime.datetime.utcnow())
#
#     objects = FriendsManager()
#
#     class Meta:
#         managed = False
#         db_table = 'friends'


class LikesManager(models.Manager):

    def get_user_likes_count(self, user):
        likes_count = 0
        try:
            qs = Likes.objects.filter(users_idx=user)
            likes_count = qs.count()
            return likes_count
        except:
            pass

        return likes_count


    def get_liked_posts(self,user):
        try:
            qs = Likes.objects.filter(users_idx=user)
            return qs
        except:
            pass

    def is_liked(self, user, post):
        try:
            qs = Likes.objects.get(users_idx=user, posts_idx=post)
            if qs is not None:
                return True
            else:
                return False
        except:
            pass

        return False

    def like_toggle(self, user, post):
        post = Posts.objects.get(idx=post)

        if self.is_liked(user,post):
            post.likes_count += 1
        else:
            post.likes_count -= 1



class Likes(models.Model):
    idx = models.AutoField(primary_key=True)
    users_idx = models.ForeignKey('Users', models.DO_NOTHING, db_column='users_idx', related_name='fk_likes_1')
    posts_idx = models.ForeignKey('Posts', models.DO_NOTHING, db_column='posts_idx', related_name='fk_likes_2')
    created_dt = models.DateTimeField(default=datetime.datetime.utcnow())

    objects = LikesManager()

    class Meta:
        managed = False
        db_table = 'likes'




class Messages(models.Model):
    idx = models.AutoField(primary_key=True)
    contents = models.TextField()
    sender_idx = models.ForeignKey('Users', models.DO_NOTHING, db_column='sender_idx', related_name='fk_messages_1')
    receiver_idx = models.ForeignKey('Users', models.DO_NOTHING, db_column='receiver_idx', related_name='fk_messages_2')
    room_idx = models.ForeignKey('Rooms', models.DO_NOTHING, db_column='room_idx')
    created_dt = models.DateTimeField(default=datetime.datetime.utcnow())

    class Meta:
        managed = False
        db_table = 'messages'

    def __str__(self):
        return self.contents


class Notifications(models.Model):
    idx = models.AutoField(primary_key=True)
    users_idx = models.ForeignKey('Users', models.DO_NOTHING, db_column='users_idx')
    contents = models.CharField(max_length=225)
    url = models.CharField(max_length=225)
    flag = models.IntegerField()
    created_dt = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'notifications'


class Posts(models.Model):
    idx = models.AutoField(primary_key=True)
    contents = models.CharField(max_length=500)
    users_idx = models.ForeignKey('Users', models.DO_NOTHING, db_column='users_idx')
    created_dt = models.DateTimeField(default=datetime.datetime.utcnow())
    track_idx = models.ForeignKey('Tracks', models.DO_NOTHING, db_column='track_idx', blank=True, null=True)
    tags = models.CharField(max_length=255, blank=True, null=True)
    comments_count = models.IntegerField(blank=True, null=True)
    likes_count = models.IntegerField(blank=True, null=True)
    updated_dt = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f'Post (idx: {self.pk}, Author: {self.users_idx}, Description: {self.contents}, ' \
               f'uploadedAt: {self.created_dt},track_idx:{self.track_idx} tags: {self.tags})'

    class Meta:
        managed = False
        db_table = 'posts'
        ordering = ['-created_dt']


class Rooms(models.Model):
    idx = models.AutoField(primary_key=True)
    users_idx_1 = models.ForeignKey('Users', models.DO_NOTHING, db_column='users_idx_1', related_name='fk_rooms_1')
    users_idx_2 = models.ForeignKey('Users', models.DO_NOTHING, db_column='users_idx_2', related_name='fk_rooms_2')
    last_message = models.TextField()
    created_dt = models.DateTimeField(default=datetime.datetime.utcnow())
    updated_dt = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'rooms'


class TrackGenres(models.Model):
    idx = models.AutoField(primary_key=True)
    name = models.CharField(max_length=45)

    class Meta:
        managed = False
        db_table = 'track_genres'

    def __str__(self):
        return self.name


class TrackTypes(models.Model):
    idx = models.AutoField(primary_key=True)
    name = models.CharField(max_length=45)

    class Meta:
        managed = False
        db_table = 'track_types'

    def __str__(self):
        return self.name


class Tracks(models.Model):
    idx = models.AutoField(primary_key=True)
    title = models.CharField(max_length=45)
    genre_idx = models.ForeignKey(TrackGenres, models.DO_NOTHING, db_column='genre_idx', blank=True, null=True)
    type_idx = models.ForeignKey(TrackTypes, models.DO_NOTHING, db_column='type_idx')
    track_source = models.CharField(max_length=80)
    image = models.CharField(max_length=225, blank=True, null=True)
    flag = models.IntegerField(blank=True, null=True)
    users_idx = models.CharField(max_length=255)
    created_dt = models.DateTimeField(default=datetime.datetime.utcnow())
    played_count = models.IntegerField(blank=True, null=True)
    moods = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tracks'

    def __str__(self):
        return f'Title: {self.title}'

# follow manager related user
class FriendsManager(models.Manager):

    def get_following_users(self, profile_user):
        qs = Friends.objects.filter(sender_idx=profile_user).values('receiver_idx')
        return qs

    # users = []
    # qs = Friends.objects.filter(sender_idx=profile_user).values('receiver_idx')
    # for q in qs:
    #     users.insert(Users.objects.get(idx=q))  # User.objects.all().exclude(username=self.user.username)
    #
    # return users

    def get_followers(self, profile_user):
        qs = Friends.objects.filter(receiver_idx=profile_user).values('sender_idx')
        return qs

    def toggle_follow(self, user, to_toggle_user):
        friend, created = Friends.objects.get_or_create(sender_idx=user)  # (user_obj, true)
        # to_toggle_user -> current user가 팔로우 하고 싶은 사람을 받은
        if to_toggle_user in friend.receiver_idx.all():
            Friends.objects.delete(receiver_idx=to_toggle_user)
            added = False
        else:
            follow = Friends(sender_idx=user, receiver_idx=to_toggle_user)
            follow.save()
            added = True
        return added

    def is_following(self, user, followed_by_user):
        friend, created = Friends.objects.get_or_create(sender_idx=user)
        if created:
            return False
        if followed_by_user in friend.receiver_idx.all():
            return True
        return False


class Users(models.Model):
    objects = models.Manager()
    idx = models.AutoField(primary_key=True)
    user_id = models.CharField(unique=True, max_length=45)
    pw = models.CharField(max_length=80)
    nickname = models.CharField(max_length=45, blank=True, null=True)
    email = models.CharField(max_length=45)
    profile = models.CharField(max_length=500, blank=True, null=True)
    salt = models.CharField(max_length=64)
    follower_count = models.IntegerField(blank=True, null=True)
    following_count = models.IntegerField(blank=True, null=True)
    tracks_count = models.IntegerField(blank=True, null=True)
    grade = models.IntegerField()
    status = models.IntegerField()
    created_dt = models.DateTimeField(default=datetime.datetime.utcnow())
    access_dt = models.DateTimeField(blank=True, null=True)
    updated_dt = models.DateTimeField(blank=True, null=True)
    refresh_token = models.CharField(max_length=225, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'users'

    def __str__(self):
        return str(self)


class Friends(models.Model):
    objects = models.Manager()
    idx = models.AutoField(primary_key=True)
    sender_idx = models.ForeignKey('Users', models.DO_NOTHING, db_column='sender_idx', related_name='fk_friends_1')
    receiver_idx = models.ForeignKey('Users', models.DO_NOTHING, db_column='receiver_idx', related_name='fk_friends_2')
    created_dt = models.DateTimeField(default=datetime.datetime.utcnow())

    objects = FriendsManager()

    class Meta:
        managed = False
        db_table = 'friends'


class UsersHasTracks(models.Model):
    idx = models.AutoField(primary_key=True)
    users_idx = models.ForeignKey(Users, models.DO_NOTHING, db_column='users_idx')
    tracks_idx = models.ForeignKey(Tracks, models.DO_NOTHING, db_column='tracks_idx')
    created_dt = models.DateTimeField(default=datetime.datetime.utcnow())

    class Meta:
        managed = False
        db_table = 'users_has_tracks'