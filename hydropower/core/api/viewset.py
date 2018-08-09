from rest_framework import viewsets, serializers
from rest_framework.response import Response
from django.core.serializers import serialize
import json
from core.models import Hydropower
from .serializers import HydropowerSerializer

class HydropowerViewSet(viewsets.ModelViewSet):
	# queryset = Hydropower.objects.all()
	# serializer_class = HydropowerSerializer
    return Response(json.loads(serialize('geojson', Hydropower.objects.all(),
              geometry_field='point',
              fields=('name',))))