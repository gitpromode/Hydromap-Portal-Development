from django import forms
from .models import Province, District, GapaNapa

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