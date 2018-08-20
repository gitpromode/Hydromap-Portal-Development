from django import forms
from .models import Province, District, GapaNapa, Hydropower

class ProvinceCreateForm(forms.ModelForm):

	class Meta:
		model = Province
		fields = ('name',)


class DistrictCreateForm(forms.ModelForm):

	class Meta:
		model = District
		fields = ('name', 'province',)


class GapaNapaCreateForm(forms.ModelForm):

	class Meta:
		model = GapaNapa
		fields = ('name', 'district',)


class HydropowerCreateForm(forms.ModelForm):

	class Meta:
		model = Hydropower
		fields = ('license_type', 'province', 'district', 'gapanapa', 'project', 'capacity', 'river', 'lic_number', 'issue_date', 'validity', 'promoter', 'address', 'latlong', 'other_properties', 'gapanapa',)