from rest_framework import viewsets, serializers
from rest_framework.response import Response
import json
from django.core.serializers import serialize
from core.models import Hydropower
from .serializers import HydropowerSerializer

class HydropowerViewSet(viewsets.ModelViewSet):
    # queryset = Hydropower.objects.all()
    # serializer_class = HydropowerSerializer
    def get(self, request, normal=None):
        return Response(json.loads(serialize('geojson', Hydropower.objects.all(),
              geometry_field='point',
              fields=('name',))))