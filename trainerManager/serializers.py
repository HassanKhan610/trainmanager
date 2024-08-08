
# trainerManager/serializers.py
from rest_framework import serializers
from trainerManager.models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['email', 'first_name', 'last_name', 'password']
        extra_kwargs = {'password': {'write_only': True}}
        read_only_fields = ('id',)

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user

    def validate(self, data):
        # Add validation logic as needed
        return data
