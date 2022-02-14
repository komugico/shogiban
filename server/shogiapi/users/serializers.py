from rest_framework import serializers

from .models import Player

class PlayerSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Player
        fields = ('id', 'username', 'password')

    def create(self, validated_data):
        return Player.objects.create_user(request_data=validated_data)