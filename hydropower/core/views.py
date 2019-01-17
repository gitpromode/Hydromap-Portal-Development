from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.exceptions import PermissionDenied
from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.shortcuts import reverse, get_object_or_404 	
from django.views.generic import TemplateView
from .models import Province, District, GapaNapa, Hydropower, Gislayer, GisStyle, Document
from django.views.generic import ListView, DetailView, CreateView, DeleteView, UpdateView
from .forms import ProvinceCreateForm, DistrictCreateForm, GapaNapaCreateForm, HydropowerCreateForm, \
GislayerCreateForm, DocumentCreateForm, GisStyleCreateForm, UserCreateForm
# from userrole.forms import UserRoleCreateForm
from django.contrib.auth.models import User
from django.urls import reverse_lazy
from django.views import generic
from django.db.models import Q
import sys
import argparse
from django.contrib.gis.geos import Point
from django.contrib import messages
# from userrole.forms import UserProfileForm
from userrole.models import UserRole


class HomeView(TemplateView):
	template_name = 'hydro/home.html'

	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		context['provinces'] = Province.objects.all()
		context['districts'] = District.objects.all()
		context['gapanapas'] = GapaNapa.objects.all()
		return context


# class EditAdminMixin(LoginRequiredMixin):
#
# 	def dispatch(self, request, *args, **kwargs):
# 		if request.user.is_authenticated:
#             if request.user.is_superuser == "Edit Admin"
#                 return super(EditAdminMixin, self).dispatch(request, *args, **kwargs)
#         raise PermissionDenied
#
#
# class DeleteAdminMixin(LoginRequiredMixin):
#
# 	def dispatch(self, request, *args, **kwargs):
# 		if request.user.is_authenticated:
# 			if request.user.is_superuser == "Delete Admin"
# 				return super(DeleteAdminMixin, self).dispatch(request, *args, **kwargs)
# 		raise PermissionDenied


class CoresDashboardView(LoginRequiredMixin, TemplateView):
	template_name = 'core/cores_dashboard.html'

	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		try:
			context['userrole'] = UserRole.objects.get(user=self.request.user)
		except:
			print("userrole doesnot exist")
		context['hydropower'] = Hydropower.objects.all()
		return context


class GislayerView(LoginRequiredMixin, TemplateView):
	template_name = 'core/gislayer.html'

	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		try:
			context['userrole'] = UserRole.objects.get(user=self.request.user)
		except:
			print("userrole doesnot exist")
		context['gislayer'] = Gislayer.objects.all()
		return context


class ProvinceListView(LoginRequiredMixin, ListView):
	model = Province
	template_name = 'core/province_list.html'

	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		try:
			context['userrole'] = UserRole.objects.get(user=self.request.user)
		except:
			print("userrole doesnot exist")
		return context


class ProvinceDetailView(LoginRequiredMixin, DetailView):
	model = Province
	template_name = 'core/province_detail.html'

	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		try:
			context['userrole'] = UserRole.objects.get(user=self.request.user)
		except:
			print("userrole doesnot exist")
		context['districts'] = District.objects.filter(province_id=self.kwargs['pk'])
		return context


class ProvinceCreateView(LoginRequiredMixin, CreateView):
	model = Province
	form_class = ProvinceCreateForm
	template_name = 'core/province_form.html'
	success_url = reverse_lazy('core:province_list')

	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		try:
			context['userrole'] = UserRole.objects.get(user=self.request.user)
		except:
			print("userrole doesnot exist")
		return context


class ProvinceUpdateView(LoginRequiredMixin, UpdateView):
	model = Province
	template_name = 'core/province_form.html'
	fields = ('name',)
	success_url = reverse_lazy('core:province_list')

	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		try:
			context['userrole'] = UserRole.objects.get(user=self.request.user)
		except:
			print("userrole doesnot exist")
		return context


class ProvinceDeleteView(LoginRequiredMixin, DeleteView):
	model = Province
	template_name = 'core/province_delete.html'
	success_url = reverse_lazy('core:province_list')

	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		try:
			context['userrole'] = UserRole.objects.get(user=self.request.user)
		except:
			print("userrole doesnot exist")
		return context


class DistrictListView(LoginRequiredMixin, ListView):
	model = District
	template_name = 'core/district_list.html'

	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		try:
			context['userrole'] = UserRole.objects.get(user=self.request.user)
		except:
			print("userrole doesnot exist")
		return context


class DistrictDetailView(LoginRequiredMixin, DetailView):
	model = District
	template_name = 'core/district_detail.html'

	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		context['gapanapas'] = GapaNapa.objects.filter(district_id=self.kwargs['pk'])
		return context
		

class DistrictCreateView(LoginRequiredMixin, CreateView):
	model = District
	form_class = DistrictCreateForm
	template_name = 'core/district_form.html'
	success_url = reverse_lazy('core:district_list')

	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		try:
			context['userrole'] = UserRole.objects.get(user=self.request.user)
		except:
			print("userrole doesnot exist")
		return context


class DistrictUpdateView(LoginRequiredMixin, UpdateView):
	model = District
	template_name = 'core/district_form.html'
	fields = ('name', 'province',)
	success_url = reverse_lazy('core:district_list')

	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		try:
			context['userrole'] = UserRole.objects.get(**kwargs)
		except:
			print("userrole doesnot exist")
		return context


class DistrictDeleteView(LoginRequiredMixin, DeleteView):
	model = District
	template_name = 'core/district_delete.html'
	success_url = reverse_lazy('core:district_list')

	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		try:
			context['userrole'] = UserRole.objects.get(user=self.request.user)
		except:
			print("userrole doesnot exist")
		return context


class GapaNapaListView(LoginRequiredMixin, ListView):
	model = GapaNapa
	template_name = 'core/gapanapa_list.html'

	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		try:
			context['userrole'] = UserRole.objects.get(user=self.request.user)
		except:
			print("userrole doesnot exist")
		return context


class GapaNapaDetailView(LoginRequiredMixin, DetailView):
	model = GapaNapa
	template_name = 'core/gapanapa_detail.html'

	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		context['hydropowers'] = Hydropower.objects.filter(gapanapa_id=self.kwargs['pk'])
		return context


class GapaNapaCreateView(LoginRequiredMixin, CreateView):
	model = GapaNapa
	form_class = GapaNapaCreateForm
	template_name = 'core/gapanapa_form.html'
	success_url = reverse_lazy('core:gapanapa_list')

	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		try:
			context['userrole'] = UserRole.objects.get(user=self.request.user)
		except:
			print("userrole doesnot exist")
		return context


class GapaNapaUpdateView(LoginRequiredMixin, UpdateView):
	model = GapaNapa
	template_name = 'core/gapanapa_form.html'
	fields = ('name', 'district',)
	success_url = reverse_lazy('core:gapanapa_list')

	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		try:
			context['userrole'] = UserRole.objects.get(user=self.request.user)
		except:
			print("userrole doesnot exist")
		return context


class GapaNapaDeleteView(LoginRequiredMixin, DeleteView):
	model = GapaNapa
	template_name = 'core/gapanapa_delete.html'
	success_url = reverse_lazy('core:gapanapa_list')

	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		try:
			context['userrole'] = UserRole.objects.get(user=self.request.user)
		except:
			print("userrole doesnot exist")
		return context



class HydropowerListView(LoginRequiredMixin, ListView):
	model = Hydropower
	template_name = 'core/hydropower_list.html'

	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		try:
			context['userrole'] = UserRole.objects.get(user=self.request.user)
		except:
			print("userrole doesnot exist")
		return context


class HydropowerDetailView(LoginRequiredMixin, DetailView):
	model = Hydropower
	template_name = 'core/hydropower_detail.html'
	

class HydropowerCreateView(LoginRequiredMixin, CreateView):
	model = Hydropower
	form_class = HydropowerCreateForm
	template_name = 'core/hydropower_form.html'
	# success_url = reverse_lazy('core:hydropower_list')

	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		try:
			context['userrole'] = UserRole.objects.get(user=self.request.user)
		except:
			print("userrole doesnot exist")
		return context

	def get_success_url(self):
		success_url = reverse_lazy('core:datasets')
		return success_url


class HydropowerUpdateView(LoginRequiredMixin, UpdateView):
	model = Hydropower
	template_name = 'core/hydropower_form.html'
	form_class = HydropowerCreateForm
	# success_url = reverse_lazy('core:hydropower_list')

	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		try:
			context['userrole'] = UserRole.objects.get(user=self.request.user)
		except:
			print("userrole doesnot exist")
		return context

	def get_success_url(self):
		success_url = reverse_lazy('core:cores_dashboard')
		return success_url


class HydropowerDeleteView(LoginRequiredMixin, DeleteView):
	model = Hydropower
	template_name = 'core/hydropower_delete.html'

	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		try:
			context['userrole'] = UserRole.objects.get(user=self.request.user)
		except:
			print("userrole doesnot exist")
		return context

	def get_success_url(self):
		success_url = reverse_lazy('core:cores_dashboard')
		return success_url


class DistrictGapaNapaView(LoginRequiredMixin, TemplateView):
	template_name = 'core/district_gapanapa.html'

	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		context['district'] = District.objects.get(id=self.kwargs['district_pk'])
		context['district_gapanapa'] = GapaNapa.objects.filter(district_id=self.kwargs['district_pk'])
		return context


def load_districts(request):
	province_id = request.GET.get('province')
	districts = District.objects.filter(province_id=province_id).order_by('name')
	return render(request, 'core/district_dropdown_list.html', {'districts': districts})


def load_gapanapas(request):
    district_id = request.GET.get('district')
    gapanapas = GapaNapa.objects.filter(district_id=district_id).order_by('name')
    return render(request, 'core/gapanapa_dropdown_list.html', {'gapanapas': gapanapas})


class SignUp(generic.CreateView):
	form_class = UserCreateForm
	success_url = reverse_lazy('login')
	template_name = 'core/signup.html'


class UserProfileView(LoginRequiredMixin, TemplateView):
	model = User
	template_name = 'core/user_profile.html'

	def get_context_data(self, **kwargs):
		data = super(UserProfileView, self).get_context_data(**kwargs)
		data['user'] = User.objects.get(username=self.kwargs['username'])
		return data


class UserProfileUpdateView(LoginRequiredMixin, UpdateView):
	model = User
	fields = ('first_name', 'last_name', 'email')
	context_object_name = 'user'
	template_name = 'core/user_profile_update.html'

	def get_success_url(self):
		success_url = reverse_lazy('core:cores_dashboard')
		return success_url


def process(request):
	province_id = request.GET.get('state', None)
	data = {
		'province_id': province_id
	}
	return JsonResponse(data)


class Datasets(TemplateView):
	template_name = 'core/datasets.html'

	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		context['hydropower'] = Hydropower.objects.all()
		context['provinces'] = Province.objects.all()
		context['districts'] = District.objects.all()
		context['gapanapas'] = GapaNapa.objects.all()
		context['hydropower_count'] = Hydropower.objects.all().count()
		context['capacity_20'] = Hydropower.objects.filter(capacity__lt=20).count()
		context['capacity_between'] = Hydropower.objects.filter(Q(capacity__gte=20) & Q(capacity__lte=100)).count()
		context['capacity_100'] = Hydropower.objects.filter(capacity__gt=100).count()
		return context
		

class About(TemplateView):
	template_name = 'core/about.html'



class HydropowerProfile(DetailView):
	template_name = 'core/hydropower-profile.html'
	model = Hydropower

	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		context['document'] = Document.objects.all()
		return context

class Gislayers(TemplateView):
	template_name = 'core/gislayer.html'

	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		try:
			context['usrrole'] = UserRole.objects.get(user=self.request.user)
		except:
			print("userrole doesnot exist")
		context['gislayer'] = Gislayer.objects.all()
		return context


class GislayerListView(LoginRequiredMixin, ListView):
	model = Gislayer
	template_name = 'core/gislayer_list.html'

	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		try:
			context['userrole'] = UserRole.objects.get(user=self.request.user)
		except:
			print("userrole doesnot exist")
		return context


class GislayerDetailView(LoginRequiredMixin, DetailView):
	model = Gislayer
	template_name = 'core/gislayer_detail.html'


class GislayerCreateView(LoginRequiredMixin, CreateView):
	model = Gislayer
	form_class = GislayerCreateForm
	template_name = 'core/gislayer_form.html'

	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		try:
			context['userrole'] = UserRole.objects.get(user=self.request.user)
		except:
			print("userrole doesnot exist")
		return context

	def get_success_url(self):
		success_url = reverse_lazy('core:gislayer')
		return success_url


class GislayerUpdateView(LoginRequiredMixin, UpdateView):
	model = Gislayer
	template_name = 'core/gislayer_form.html'
	form_class = GislayerCreateForm

	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		try:
			context['userrole'] = UserRole.objects.get(user=self.request.user)
		except:
			print("userrole doesnot exist")
		return context

	def get_success_url(self):
		success_url = reverse_lazy('core:gislayer')
		return success_url


class GislayerDeleteView(LoginRequiredMixin, DeleteView):
	model = Gislayer
	template_name = 'core/gislayer_delete.html'
	success_url = reverse_lazy('core:gislayer')

	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		try:
			context['userrole'] = UserRole.objects.get(user=self.request.user)
		except:
			print("userrole doesnot exist")
		return context



class DocumentListView(LoginRequiredMixin, ListView):
	model = Document
	template_name = 'core/document_list.html'

	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		try:
			context['userrole'] = UserRole.objects.get(user=self.request.user)
		except:
			print("userrole doesnot exist")
		return context


class DocumentDetailView(LoginRequiredMixin, DetailView):
	model = Document
	template_name = 'core/document_detail.html'


class DocumentCreateView(LoginRequiredMixin, CreateView):
	model = Document
	form_class = DocumentCreateForm
	template_name = 'core/document_form.html'

	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		try:
			context['userrole'] = UserRole.objects.get(user=self.request.user)
		except:
			print("userrole doesnot exist")
		return context

	def get_success_url(self):
		success_url = reverse_lazy('core:document')
		return success_url


class DocumentUpdateView(LoginRequiredMixin, UpdateView):
	model = Document
	template_name = 'core/document_form.html'
	form_class = DocumentCreateForm

	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		try:
			context['userrole'] = UserRole.objects.get(user=self.request.user)
		except:
			print("userrole doesnot exist")
		return context

	def get_success_url(self):
		success_url = reverse_lazy('core:document')
		return success_url


class DocumentDeleteView(LoginRequiredMixin, DeleteView):
	model = Document
	template_name = 'core/document_delete.html'
	success_url = reverse_lazy('core:document')

	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		try:
			context['userrole'] = UserRole.objects.get(user=self.request.user)
		except:
			print("userrole doesnot exist")
		return context


class HydropowerDocumentView(TemplateView):
	template_name = 'core/document.html'

	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		try:
			context['userrole'] = UserRole.objects.get(user=self.request.user)
		except:
			print("userrole doesnot exist")
		context['document'] = Document.objects.all()
		return context


def string_to_year(string_date):
	try:
		split_list = string_date.split("/")
		year = int(split_list[2])
		return year
	except:
		print(string_date, "Incorected Year")
		return 2030

def string_to_month(string_date):
	try:
		split_list = string_date.split("/")
		month = int(split_list[0])
		return month
	except:
		print(string_date, "Incorected Month")
		return 1

def string_to_day(string_date):
	try:
		split_list = string_date.split("/")
		day = int(split_list[1])
		return day
	except:
		print(string_date, "Incorected Day")
		return 1

def file_upload(request):
	import pandas as pd

	request_files = request.FILES.getlist('file')
	df = [pd.read_csv(filename).fillna(value='') for filename in request_files][0]

	for row in range(0, 573):
		pnt = Point(df['Longitude'][row], df['Latitude'][row])
		province = int(df['Province'][row])
		hydropower, created = Hydropower.objects.get_or_create(pk=df['S_No'][row]
			)
		hydropower.province=Province.objects.get(name='Province ' + str(province))
		hydropower.district=District.objects.get(name=df['District'][row])
		hydropower.gapanapa=GapaNapa.objects.get(name=df['Municipality'][row], district__name=df['District'][row])
		hydropower.province_name=province
		hydropower.district_name=df['District'][row]
		hydropower.gapanapa_name=df['Municipality'][row]
		hydropower.project=df['Project'][row]
		hydropower.capacity=df['Capacity (MW)'][row]
		hydropower.river=df['River'][row]
		hydropower.lic_number=df['Lic No'][row]
		hydropower.issue_date_years=string_to_year(df['Isuue Date'][row])
		hydropower.issue_date_months=string_to_month(df['Isuue Date'][row])
		hydropower.issue_date_days=string_to_day(df['Isuue Date'][row])
		hydropower.validity_date_years=string_to_year(df['Validity'][row])
		hydropower.validity_date_months=string_to_month(df['Validity'][row])
		hydropower.validity_date_days=string_to_day(df['Validity'][row])
		hydropower.promoter=df['Promoter'][row]
		hydropower.address=df['Address'][row]
		hydropower.latlong=pnt
		hydropower.license_type=df['License Type'][row]
		hydropower.date_of_operation=df['Date of Operation'][row]

		hydropower.save()
	messages.success(request, 'Successfully loaded data from files')
	return HttpResponseRedirect('/core')

	# if created:
	# 	self.stdout.write('Sucessfully loaded %s' % hydropower)
	# 	return HttpResponseRedirect('/upload')

# def file_upload(request):
# 	import pandas as pd
#
# 	request_files = request.FILES.getlist('file')
# 	print(request_files)
# 	df = [pd.read_csv(filename).fillna(value='') for filename in request_files][0]
# 	print(df.columns)
#
# 	import ipdb
# 	ipdb.set_trace()
#
# 	#
# 	df.columns
# 	csv_col = df.columns.tolist()
# 	csv_col.remove('S_No')
# 	model_col = ['Province', 'District', 'Municipality', 'Project', 'Capacity (MW)', 'River', 'Lic No', 'Isuue Date',
# 				 'Validity',
# 				 'Promoter', 'Address', 'Longitude', 'Latitude', 'License Type', 'Date of Operation']
# 	csv_col = set(csv_col)
# 	model_col = set(model_col)
# 	data = csv_col.difference(model_col)
# 	data = list(data)
# 	count_data = len(data)
#
# 	for row in range(0, 573):
# 		pnt = Point(df['Longitude'][row], df['Latitude'][row])
# 		province = int(df['Province'][row])
# 		hydropower, created = Hydropower.objects.get_or_create(pk=df['S_No'][row]
# 															   )
# 		hydropower.province = Province.objects.get(name='Province ' + str(province))
# 		hydropower.district = District.objects.get(name=df['District'][row])
# 		hydropower.gapanapa = GapaNapa.objects.get(name=df['Municipality'][row], district__name=df['District'][row])
# 		hydropower.province_name = province
# 		hydropower.district_name = df['District'][row]
# 		hydropower.gapanapa_name = df['Municipality'][row]
# 		hydropower.project = df['Project'][row]
# 		hydropower.capacity = df['Capacity (MW)'][row]
# 		hydropower.river = df['River'][row]
# 		hydropower.lic_number = df['Lic No'][row]
# 		hydropower.issue_date_years = string_to_year(df['Isuue Date'][row])
# 		hydropower.issue_date_months = string_to_month(df['Isuue Date'][row])
# 		hydropower.issue_date_days = string_to_day(df['Isuue Date'][row])
# 		hydropower.validity_date_years = string_to_year(df['Validity'][row])
# 		hydropower.validity_date_months = string_to_month(df['Validity'][row])
# 		hydropower.validity_date_days = string_to_day(df['Validity'][row])
# 		hydropower.promoter = df['Promoter'][row]
# 		hydropower.address = df['Address'][row]
# 		hydropower.latlong = pnt
# 		hydropower.license_type = df['License Type'][row]
# 		hydropower.date_of_operation = df['Date of Operation'][row]
# 		for i in range(0, count_data):
# 			hydropower.other_properties = {data[i]: df[data[i][row]]}
#
# 		hydropower.save()
# 	messages.success(request, 'Successfully loaded data from files')
# 	return HttpResponseRedirect('/core')


class GisStyle(generic.CreateView):
	form_class = GisStyleCreateForm
	success_url = reverse_lazy('core:gislayer')
	template_name = 'core/gis_style.html'

	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		context['gislayer'] = Gislayer.objects.get(id=self.kwargs['pk'])
		return context

#
# class UserRoleCreateView(CreateView):
#     """
#     User SignUp form
#     """
#     form_class = UserRoleCreateForm
#     template_name = 'core/signup.html'
#
#     def get_context_data(self, **kwargs):
#         context = super().get_context_data(**kwargs)
#         context['users'] = User.objects.all()
#         return context
#
#     def get_success_url(self):
#         return reverse('core:cores_dashboard')