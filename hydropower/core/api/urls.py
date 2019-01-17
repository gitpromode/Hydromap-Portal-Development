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
	path('province/', viewset.ProvinceViewSet.as_view({'get': 'list'})),	
	path('province-value/', viewset.ProvinceValueViewSet.as_view({'get': 'list'})),
	path('district-value/', viewset.DistrictValueViewSet.as_view({'get': 'list'})),
	path('license-type/', viewset.license_type_filter),
	path('gislayer/', viewset.GislayerViewSet.as_view({'get': 'list'})),
	path('gapanapa/', viewset.GapaNapaViewSet.as_view({'get': 'list'})),
	path('district/', viewset.DistrictViewSet.as_view({'get': 'list'})),
	path('gis-style/', viewset.GisStyleViewSet.as_view({'get': 'list'})),
]