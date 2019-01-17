from django.db.models import Q
from rest_framework import viewsets, serializers
from rest_framework.response import Response
from django.core.serializers import serialize
import json
from core.models import Hydropower, Province, District, GapaNapa, Gislayer, GisStyle
from .serializers import HydropowerSerializer, ProvinceSerializer, ProvinceValueSerializer, \
DistrictValueSerializer, DistrictSerializer, GapaNapaSerializer, GislayerSerializer, GisStyleSerializer
from rest_framework.views import APIView
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.filters import SearchFilter


class HydropowerViewSet(APIView):

    def get(self, request):
        license_query = self.request.query_params.get('license_type')
        capacity_query = self.request.query_params.get('capacity')

        if license_query:

            return HttpResponse(serialize('geojson', Hydropower.objects.filter(license_type=license_query),
                      geometry_field='latlong',
                      fields = (
                            'pk',
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
                            'issue_date_years',
                            'issue_date_months',
                            'issue_date_days',
                            'validity_date_years',
                            'validity_date_months',
                            'validity_date_days',
                            'promoter',
                            'address',
                            'license_type',
                            'other_properties',
                            )),
                            content_type='application/json')
            
        elif capacity_query == '20':
            return HttpResponse(serialize('geojson', Hydropower.objects.filter(capacity__lt=capacity_query),
                                          geometry_field='latlong',
                                          fields=(
                                              'pk',
                                              'province',
                                              'district',
                                              'gapanapa',
                                              'province_name'
                                              'district_name'
                                              'gapanapa_name'
                                              'project',
                                              'capacity',
                                              'river',
                                              'lic_number',
                                              'issue_date_years',
                                              'issue_date_months',
                                              'issue_date_days',
                                              'validity_date_years',
                                              'validity_date_months',
                                              'validity_date_days',
                                              'promoter',
                                              'address',
                                              'license_type',
                                              'other_properties',
                                          )),
                                content_type='application/json')

        elif capacity_query == '100':
            return HttpResponse(serialize('geojson', Hydropower.objects.filter(capacity__gt=capacity_query),
                                          geometry_field='latlong',
                                          fields=(
                                              'pk',
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
                                              'issue_date_years',
                                              'issue_date_months',
                                              'issue_date_days',
                                              'validity_date_years',
                                              'validity_date_months',
                                              'validity_date_days',
                                              'promoter',
                                              'address',
                                              'license_type',
                                              'other_properties',
                                          )),
                                content_type='application/json')

        elif capacity_query == 'between':
            return HttpResponse(serialize('geojson', Hydropower.objects.filter(Q(capacity__gte=20) & Q(capacity__lte=100)),
                                          geometry_field='latlong',
                                          fields=(
                                              'pk',
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
                                              'issue_date_years',
                                              'issue_date_months',
                                              'issue_date_days',
                                              'validity_date_years',
                                              'validity_date_months',
                                              'validity_date_days',
                                              'promoter',
                                              'address',
                                              'license_type',
                                              'other_properties',
                                          )),
                                content_type='application/json')


        else:
            return HttpResponse(serialize('geojson', Hydropower.objects.all(),
                                          geometry_field='latlong',
                                          fields=(
                                              'pk',
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
                                              'issue_date_years',
                                              'issue_date_months',
                                              'issue_date_days',
                                              'validity_date_years',
                                              'validity_date_months',
                                              'validity_date_days',
                                              'promoter',
                                              'address',
                                              'license_type',
                                              'other_properties',
                                          )),
                                content_type='application/json')


@api_view(['GET'])
def country_geojson(request):
    """
    list of country geojson
    """
    data = {}
    try:
        with open('jsons/province.json') as f:
            data = json.load(f)
    except:
        pass

    return Response(data)



@api_view(['GET'])
def district_geojson(request):
    """
    list of district geojson
    """
    data = {}
    try:
        with open('jsons/district.json') as f:
            data = json.load(f)
    except:
        pass

    return Response(data)


@api_view(['GET'])
def municipality_geojson(request):
    """
    list of municipality geojson
    """
    data = {}
    try:
        with open('jsons/municipality.json') as f:
            data = json.load(f)
    except:
        pass

    return Response(data)


class ProvinceViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ProvinceSerializer
    queryset = Province.objects.all()


class ProvinceValueViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ProvinceValueSerializer
    queryset = Province.objects.all()

    def get_queryset(self):
        province_query = self.request.query_params.get('name')
        if province_query:
            self.queryset = self.queryset.filter(name=province_query)
        return self.queryset


class DistrictValueViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = DistrictValueSerializer
    queryset = District.objects.all()

    def get_queryset(self):
        district_query = self.request.query_params.get('name')
        if district_query:
            self.queryset = self.queryset.filter(name=district_query)
        return self.queryset


@api_view(['GET'])
def license_type_filter(request):

    data = [{
        'name':'Survey', 'value': Hydropower.objects.filter(license_type='Survey').count()},
        {'name': 'Generation', 'value': Hydropower.objects.filter(license_type='Generation').count()},
        {'name': 'Operation', 'value': Hydropower.objects.filter(license_type='Operation').count(),

    }]

    return Response(data)


class GislayerViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = GislayerSerializer
    queryset = Gislayer.objects.all()


class GapaNapaViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = GapaNapaSerializer
    queryset = GapaNapa.objects.all()


class DistrictViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = DistrictSerializer
    queryset = District.objects.all()


class GisStyleViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = GisStyleSerializer
    queryset = GisStyle.objects.all()