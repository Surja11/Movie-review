from .models import *
from rest_framework import serializers 

class RegisterSerializer(serializers.ModelSerializer):
  password2 = serializers.CharField(style = {'input_type':'password'}, write_only =True)
  class Meta:
    model = CustomUser
    fields = ["id", "username", "email", "password","password2"]
    extra_kwargs = {"password":{"write_only":True}, "password2":{"write_only":True}}

  def validate(self, data):
      if data['password']!=data['password2']:
        raise serializers.ValidationError("Password and Confirm Password doesn't match")
      return data

  def create(self, validated_data):
      validated_data.pop('password2')
      user = CustomUser.objects.create_user(**validated_data)
      return user
    


class ReviewSerializer(serializers.ModelSerializer):
   username = serializers.CharField(source = 'user.username', read_only = True)
   
   class Meta:
      model = Review
      fields = '__all__'
      extra_kwargs = {'user': {'read_only':True}}
