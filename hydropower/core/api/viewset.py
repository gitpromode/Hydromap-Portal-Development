from rest_framework import viewsets, serializers
from rest_framework.response import Response
from django.core.serializers import serialize
import json
from core.models import Hydropower, Province
from .serializers import HydropowerSerializer
from rest_framework.views import APIView
from django.http import HttpResponse


class HydropowerViewSet(APIView):

    def get(self, request):

        return HttpResponse(serialize('geojson', Hydropower.objects.all(),
                  geometry_field='latlong',
                  fields = (
                        'shape',
                        'name',
                        'proj_size',
                        'trans_cate',
                        'province',
                        'district',
                        'gapanapa',
                        'river',
                        'start_date',
                        )),
                        content_type='application/json')

