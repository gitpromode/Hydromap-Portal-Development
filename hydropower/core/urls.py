from django.urls import path, include

from . import views
from .views import CoresDashboardView, ProvinceListView, ProvinceDetailView, ProvinceCreateView, ProvinceUpdateView, \
ProvinceDeleteView, DistrictListView, DistrictDetailView, DistrictCreateView, DistrictUpdateView, DistrictDeleteView, \
GapaNapaListView, GapaNapaDetailView, GapaNapaCreateView, GapaNapaUpdateView, GapaNapaDeleteView, \
HydropowerListView, HydropowerDetailView, HydropowerCreateView, HydropowerUpdateView, HydropowerDeleteView

app_name = 'core'

urlpatterns = [
	path('', CoresDashboardView.as_view(), name='cores_dashboard'),
    path('province-list', ProvinceListView.as_view(), name='province_list'),
    path('province-detail/<int:pk>/', ProvinceDetailView.as_view(), name='province_detail'),
    path('province-add/', ProvinceCreateView.as_view(), name='province_add'),
    path('province-edit/<int:pk>/', ProvinceUpdateView.as_view(), name='province_edit'),
	path('province-delete/<int:pk>/', ProvinceDeleteView.as_view(), name='province_delete'),
	path('district-list', DistrictListView.as_view(), name='district_list'),
    path('district-detail/<int:pk>/', DistrictDetailView.as_view(), name='district_detail'),
    path('district-add/', DistrictCreateView.as_view(), name='district_add'),
    path('district-edit/<int:pk>/', DistrictUpdateView.as_view(), name='district_edit'),
	path('district-delete/<int:pk>/', DistrictDeleteView.as_view(), name='district_delete'),
	path('gapanapa-list', GapaNapaListView.as_view(), name='gapanapa_list'),
    path('gapanapa-detail/<int:pk>/', GapaNapaDetailView.as_view(), name='gapanapa_detail'),
    path('gapanapa-add/', GapaNapaCreateView.as_view(), name='gapanapa_add'),
    path('gapanapa-edit/<int:pk>/', GapaNapaUpdateView.as_view(), name='gapanapa_edit'),
	path('gapanapa-delete/<int:pk>/', GapaNapaDeleteView.as_view(), name='gapanapa_delete'),
	path('hydropower-list', HydropowerListView.as_view(), name='hydropower_list'),
    path('hydropower-detail/<int:pk>/', HydropowerDetailView.as_view(), name='hydropower_detail'),
    path('hydropower-add/', HydropowerCreateView.as_view(), name='hydropower_add'),
    path('hydropower-edit/<int:pk>/', HydropowerUpdateView.as_view(), name='hydropower_edit'),
	path('hydropower-delete/<int:pk>/', HydropowerDeleteView.as_view(), name='hydropower_delete'),
]