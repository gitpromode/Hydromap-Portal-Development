from rest_framework import serializers
from django.core.serializers import serialize

from core.models import Hydropower, Province, District, GapaNapa, Gislayer, GisStyle

class HydropowerSerializer(serializers.ModelSerializer):
    # license_type = serializers.CharField(source='get_license_type_display')
    province = serializers.CharField(source='province.name')
    district = serializers.CharField(source='district.name')
    gapanapa = serializers.CharField(source='gapanapa.name')
    class Meta:
        model = Hydropower
        fields = (
            'province',
            'district',
            'gapanapa',
            'province_name',
            'district_name',
            'gapanapa_name',
            'project',
            'capacity',
            'river',
            'lic_number',
            'issue_date',
            'validity_date',
            'promoter',
            'address',
            'latitude',
            'longitude',
            'license_type',
            'other_properties',                  
            )


class ProvinceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Province
        fields = ('name', 'value')


class ProvinceValueSerializer(serializers.ModelSerializer):

    class Meta:
        model = Province
        fields = ('name', 'value', 'districts', 'gapanapas')


class DistrictValueSerializer(serializers.ModelSerializer):

    class Meta:
        model = District
        fields = ('name', 'value', 'gapa')


class GapaNapaSerializer(serializers.ModelSerializer):
    province = serializers.CharField(source='district.province')
    district = serializers.CharField(source='district.name')

    class Meta:
        model = GapaNapa
        fields = ('name', 'district', 'province')
            

class DistrictSerializer(serializers.ModelSerializer):
    province = serializers.CharField(source='province.name')

    class Meta:
        model = District
        fields = ('name', 'province')


class GislayerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Gislayer
        fields = ('id', 'name', 'file')


class GisStyleSerializer(serializers.ModelSerializer):
    fillOpacity = serializers.CharField(source='fill_opacity')
    dashArray = serializers.CharField(source='dash_array')
    dashOffset = serializers.CharField(source='dash_offset')
    fillColor = serializers.CharField(source='fill_color')

    class Meta:
        model = GisStyle
        fields = ('gislayer', 'opacity', 'fillOpacity', 'weight', 'dashArray', 'dashOffset', 'color', 'fillColor')