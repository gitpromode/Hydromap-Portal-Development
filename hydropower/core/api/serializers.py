from rest_framework import serializers
from django.core.serializers import serialize

from core.models import Hydropower

class HydropowerSerializer(serializers.ModelSerializer):
    province = serializers.CharField(source='province.name')
    district = serializers.CharField(source='district.name')
    gapanapa = serializers.CharField(source='gapanapa.name')
    class Meta:
        model = Hydropower
        fields = (
            'id',
            'shape',
            'name',
            'proj_size',
            'trans_cate',
            'province',
            'district',
            'gapanapa',
            'river',
            'start_date',
            )