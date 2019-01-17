from django.urls import path, include
from django.contrib.auth.models import User

from . import views
from .views import CoresDashboardView, ProvinceListView, ProvinceDetailView, ProvinceCreateView, ProvinceUpdateView, \
ProvinceDeleteView, DistrictListView, DistrictDetailView, DistrictCreateView, DistrictUpdateView, DistrictDeleteView, \
GapaNapaListView, GapaNapaDetailView, GapaNapaCreateView, GapaNapaUpdateView, GapaNapaDeleteView, \
HydropowerListView, HydropowerDetailView, HydropowerCreateView, HydropowerUpdateView, HydropowerDeleteView, \
DistrictGapaNapaView, GislayerListView, GislayerDetailView, GislayerCreateView, GislayerUpdateView, \
GislayerDeleteView, DocumentListView, DocumentDetailView, DocumentCreateView, DocumentUpdateView, \
DocumentDeleteView, About

app_name = 'core'

urlpatterns = [
	path('', CoresDashboardView.as_view(), name='cores_dashboard'),
    path('process', views.process, name='process'),
    path('about', About.as_view(), name='about'),

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
     
	path('district-gapanapa/<int:district_pk>', DistrictGapaNapaView.as_view(), name='district_gapanapa'),
    path('ajax/load-districts/', views.load_districts, name='ajax_load_districts'),
    path('ajax/load-gapanapas/', views.load_gapanapas, name='ajax_load_gapanapas'),

    path('gislayer-list', GislayerListView.as_view(), name='gislayer_list'),
    path('gislayer-detail/<int:pk>/', GislayerDetailView.as_view(), name='gislayer_detail'),
    path('gislayer-add/', GislayerCreateView.as_view(), name='gislayer_add'),
    path('gislayer-edit/<int:pk>/', GislayerUpdateView.as_view(), name='gislayer_edit'),
    path('gislayer-delete/<int:pk>/', GislayerDeleteView.as_view(), name='gislayer_delete'),

    path('document-list', DocumentListView.as_view(), name='document_list'),
    path('document-detail/<int:pk>/', DocumentDetailView.as_view(), name='document_detail'),
    path('document-add/', DocumentCreateView.as_view(), name='document_add'),
    path('document-edit/<int:pk>/', DocumentUpdateView.as_view(), name='document_edit'),
    path('document-delete/<int:pk>/', DocumentDeleteView.as_view(), name='document_delete'),

    path('datasets/', views.Datasets.as_view(), name='datasets'),
    path('hydropower-profile/<int:pk>', views.HydropowerProfile.as_view(), name='hydropower_profile'),
    path('gislayer/', views.GislayerView.as_view(), name='gislayer'),
    path('document/', views.HydropowerDocumentView.as_view(), name='document'),
    path('file-upload/', views.file_upload, name="file_upload"),
    path('gis-style/<int:pk>', views.GisStyle.as_view(), name='gis_style'),

    path('signup/', views.SignUp.as_view(), name='signup'),
    path('accounts/user-profile/<username>', views.UserProfileView.as_view(), name='user_profile'),
    path('accounts/user-profile-update/<int:pk>', views.UserProfileUpdateView.as_view(), name='user_profile_update'),
    # path('user-create/', views.UserRoleCreateView.as_view(), name="user_create"),
]