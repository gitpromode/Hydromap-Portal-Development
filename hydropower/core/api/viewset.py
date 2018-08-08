from rest_framework import viewsets, serializers

from core.models import Hydropower
from .serializers import HydropowerSerializer

class HydropowerViewSet(viewsets.ModelViewSet):
	queryset = Hydropower.objects.all()
	serializer_class = HydropowerSerializer