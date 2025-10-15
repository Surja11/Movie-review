from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser,BaseUserManager
# Create your models here.

class CustomUserManager(BaseUserManager):
    def create_user(self, username,email, password=None, **extra_fields):
        if not username:
            raise ValueError('Username is required')
        if not email:
            raise ValueError('Email is required')
        email = self.normalize_email(email)
        user = self.model(username = username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using = self._db)
        return user
    
    def create_superuser(self, username, email, password = None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('role', 'admin')

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff = True')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser = True')
        
        return self.create_user(username, email, password, **extra_fields)


class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('user', 'User'),
        ('admin','Admin')
    )
    role = models.CharField(max_length = 10, choices = ROLE_CHOICES, default = 'user')

    objects = CustomUserManager()
    


class Review(models.Model):
    user = models.ForeignKey(CustomUser, on_delete = models.CASCADE)
    movie_id = models.CharField(max_length = 100)
    ratings = models.FloatField(default=0)
    movie_title = models.CharField(max_length = 200)
    review_text = models.TextField()
    likes = models.IntegerField(default = 0)
    created_at= models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now=True)

class Comment(models.Model):
    user = models.ForeignKey(CustomUser, on_delete = models.CASCADE)
    review = models.ForeignKey(Review, on_delete = models.CASCADE)
    text = models.TextField()
    created_at= models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now=True)
