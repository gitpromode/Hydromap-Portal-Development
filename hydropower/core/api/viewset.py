from rest_framework import viewsets, serializers
from rest_framework.response import Response
from django.core.serializers import serialize
import json
from core.models import Hydropower, Province
from .serializers import HydropowerSerializer
from rest_framework.views import APIView
from django.http import HttpResponse
from rest_framework.decorators import api_view


class HydropowerViewSet(APIView):

    def get(self, request):

        return HttpResponse(serialize('geojson', Hydropower.objects.all(),
                  geometry_field='latlong',
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
