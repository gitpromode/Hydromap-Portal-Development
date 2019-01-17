from django.urls import path

from . import views

app_name = 'userrole'

urlpatterns = [
    path('userrole-create', views.UserRoleCreateView.as_view(), name="userrole_create"),
    path('userrole-list', views.UserRoleListView.as_view(), name="userrole_list"),
    path('userrole-detail/<int:pk>/', views.UserRoleDetailView.as_view(), name='userrole_detail'),
    path('userrole-add/', views.UserRoleCreateView.as_view(), name='userrole_add'),
    path('userrole-edit/<int:pk>/', views.UserRoleUpdateView.as_view(), name='userrole_edit'),
    path('userrole-delete/<int:pk>/', views.UserRoleDeleteView.as_view(), name='userrole_delete'),
    path('manage-users/', views.ManageUserView.as_view(), name='manage_users'),
    path('signup/', views.SignUp.as_view(), name='signup'),
]