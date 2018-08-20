from django.urls import path, include
from rest_framework import routers

from . import viewset

router = routers.DefaultRouter()
# router.register(r'Hydropower', viewset.HydropowerViewSet, base_name='hydropower')

urlpatterns = [
	path('', include(router.urls)),
	path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
	path('Hydropower/', viewset.HydropowerViewSet.as_view(), name="hydropower"),
	path('geojson/country/', viewset.country_geojson),
	path('geojson/district/', viewset.district_geojson),
	path('geojson/municipality', viewset.municipality_geojson),
]