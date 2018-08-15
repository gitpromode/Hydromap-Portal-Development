from django import forms
from .models import Province, District, GapaNapa, Hydropower

class ProvinceCreateForm(forms.ModelForm):

	class Meta:
		model = Province
		fields = ('name',)


class DistrictCreateForm(forms.ModelForm):

	class Meta:
		model = District
		fields = ('name',)


class GapaNapaCreateForm(forms.ModelForm):

	class Meta:
		model = GapaNapa
		fields = ('name',)


class HydropowerCreateForm(forms.ModelForm):

	class Meta:
		model = Hydropower
		fields = ('shape', 'name', 'proj_size', 'trans_cate', 'province', 'district', 'gapanapa', 'river', 'start_date', 'latlong', 'other_properties')