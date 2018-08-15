from django.http import HttpResponse
from django.views.generic import TemplateView
from .models import Province, District, GapaNapa, Hydropower
from django.views.generic import ListView, DetailView, CreateView, DeleteView, UpdateView
from .forms import ProvinceCreateForm, DistrictCreateForm, GapaNapaCreateForm, HydropowerCreateForm
from django.urls import reverse_lazy



# Create your views here.
class CoresDashboardView(TemplateView):
	template_name = 'core/cores_dashboard.html'


class ProvinceListView(ListView):
	model = Province
	template_name = 'core/province_list.html'


class ProvinceDetailView(DetailView):
	model = Province
	template_name = 'core/province_detail.html'

class ProvinceCreateView(CreateView):
	model = Province
	#fields = ('name',)
	form_class = ProvinceCreateForm
	template_name = 'core/province_form.html'
	success_url = reverse_lazy('core:province_list')


class ProvinceUpdateView(UpdateView):
	model = Province
	template_name = 'core/province_form.html'
	fields = ('name',)
	success_url = reverse_lazy('core:province_list')


class ProvinceDeleteView(DeleteView):
	model = Province
	template_name = 'core/province_delete.html'
	success_url = reverse_lazy('core:province_list')


class DistrictListView(ListView):
	model = District
	template_name = 'core/district_list.html'


class DistrictDetailView(DetailView):
	model = District
	template_name = 'core/district_detail.html'

class DistrictCreateView(CreateView):
	model = District
	#fields = ('name',)
	form_class = DistrictCreateForm
	template_name = 'core/district_form.html'
	success_url = reverse_lazy('core:district_list')


class DistrictUpdateView(UpdateView):
	model = District
	template_name = 'core/district_form.html'
	fields = ('name',)
	success_url = reverse_lazy('core:district_list')


class DistrictDeleteView(DeleteView):
	model = District
	template_name = 'core/district_delete.html'
	success_url = reverse_lazy('core:district_list')


class GapaNapaListView(ListView):
	model = GapaNapa
	template_name = 'core/gapanapa_list.html'


class GapaNapaDetailView(DetailView):
	model = GapaNapa
	template_name = 'core/gapanapa_detail.html'

class GapaNapaCreateView(CreateView):
	model = GapaNapa
	#fields = ('name',)
	form_class = GapaNapaCreateForm
	template_name = 'core/gapanapa_form.html'
	success_url = reverse_lazy('core:gapanapa_list')


class GapaNapaUpdateView(UpdateView):
	model = GapaNapa
	template_name = 'core/gapanapa_form.html'
	fields = ('name',)
	success_url = reverse_lazy('core:gapanapa_list')


class GapaNapaDeleteView(DeleteView):
	model = GapaNapa
	template_name = 'core/gapanapa_delete.html'
	success_url = reverse_lazy('core:gapanapa_list')


class HydropowerListView(ListView):
	model = Hydropower
	template_name = 'core/hydropower_list.html'


class HydropowerDetailView(DetailView):
	model = Hydropower
	template_name = 'core/hydropower_detail.html'

class HydropowerCreateView(CreateView):
	model = Hydropower
	form_class = HydropowerCreateForm
	template_name = 'core/hydropower_form.html'
	success_url = reverse_lazy('core:hydropower_list')


class HydropowerUpdateView(UpdateView):
	model = Hydropower
	template_name = 'core/hydropower_form.html'
	fields = ('shape', 'name', 'proj_size', 'trans_cate', 'province', 'district', 'gapanapa', 'river', 'start_date', 'latlong', 'other_properties')
	success_url = reverse_lazy('core:hydropower_list')


class HydropowerDeleteView(DeleteView):
	model = Hydropower
	template_name = 'core/hydropower_delete.html'
	success_url = reverse_lazy('core:hydropower_list')