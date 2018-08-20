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
            'province',
            'district',
            'gapanapa',
            'project',
            'capacity',
            'river',
            'lic_number',
            'issue_date',
            'validity',
            'promoter',
            'address',
            'latlong',
            'other_properties',
            'gapanapa'       
            )