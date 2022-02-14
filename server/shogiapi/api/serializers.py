from rest_framework import serializers

from .models import Taikyoku, Kifu

class TaikyokuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Taikyoku
        fields = '__all__'
        
class KifuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Kifu
        fields = '__all__'
    
    additional_data = serializers.SerializerMethodField()
    
    def get_additional_data(self, obj):
        return "test"