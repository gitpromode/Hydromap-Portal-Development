from django import forms
from django.contrib.gis.db import models
from django.contrib.gis.geos import Point
from .models import Province, District, GapaNapa, Hydropower, Gislayer, GisStyle, Document
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class ProvinceCreateForm(forms.ModelForm):

	class Meta:
		model = Province
		fields = ('name',)


class DistrictCreateForm(forms.ModelForm):

	class Meta:
		model = District
		fields = ('name', 'province',)

		def __init__(self, *args, **kwargs):
			super().__init__(*args, **kwargs)
			self.fields['district'].queryset = District.objects.all()

			if 'province' in self.data:
				try:
					province_id = int(self.data.get('province'))
					self.fields['district'].queryset = District.objects.filter(province_id=province_id).order_by('name')
				except (ValueError, TypeError):
					pass  # invalid input from the client; ignore and fallback to empty District queryset
			elif self.instance.pk:
				self.fields['district'].queryset = self.instance.province.district_set.order_by('name')


class GapaNapaCreateForm(forms.ModelForm):

	class Meta:
		model = GapaNapa
		fields = ('name', 'district',)

		def __init__(self, *args, **kwargs):
			super().__init__(*args, **kwargs)
			self.fields['gapanapa'].queryset = GapaNapa.objects.all()

			if 'district' in self.data:
				try:
					province_id = int(self.data.get('district'))
					self.fields['gapanapa'].queryset = GapaNapa.objects.filter(district_id=district_id).order_by('name')
				except (ValueError, TypeError):
					pass  # invalid input from the client; ignore and fallback to empty GapaNapa queryset
			elif self.instance.pk:
				self.fields['gapanapa'].queryset = self.instance.district.gapanapa_set.order_by('name')


class HydropowerCreateForm(forms.ModelForm):
	latitude = forms.FloatField(min_value=-90, max_value=90)
	longitude = forms.FloatField(min_value=-180, max_value=180)

	class Meta:
		model = Hydropower
		fields = ('license_type', 'province_name', 'district_name', 'gapanapa_name','province', 'district',
		 'gapanapa', 'project', 'capacity', 'river', 'lic_number',
		  'issue_date_years', 'issue_date_months', 'issue_date_days', 
		  'validity_date_years', 'validity_date_months', 'validity_date_days',
		    'promoter', 'address', 'longitude', 'latitude', 'gapanapa', 'latlong', 'date_of_operation', 'hydro_summary')
		# import ipdb
		# ipdb.set_trace()

	def __init__(self, *args, **kwargs):
		super(HydropowerCreateForm, self).__init__(*args, **kwargs)
		self.fields['latlong'].widget = forms.HiddenInput()
		for field in iter(self.fields):
			self.fields[field].widget.attrs.update({
				'class': 'form-control'
		})
		latlong = self.initial.get('latlong', None)
		if isinstance(latlong, Point):
			self.initial['latitude'], self.initial['longitude'] = latlong.tuple

	def save(self, commit=True):
		self.instance.latlong = Point(self.cleaned_data["longitude"], self.cleaned_data["latitude"])
		return super(HydropowerCreateForm, self).save(commit) 


class GislayerCreateForm(forms.ModelForm):
	file = forms.FileField(label='Geojson Upload')

	class Meta:
		model = Gislayer
		fields = ('name', 'file',)

	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		for field in iter(self.fields):
			self.fields[field].widget.attrs.update({
				'class': 'form-control'
			})


class GisStyleCreateForm(forms.ModelForm):
	
	class Meta:
		model = GisStyle
		fields = ('opacity', 'fill_opacity', 'weight', 'dash_array', 'dash_offset', 'color', 'fill_color')

	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		for field in iter(self.fields):
			self.fields[field].widget.attrs.update({
				'class': 'form-control'
			})


class DocumentCreateForm(forms.ModelForm):

	class Meta:
		model = Document
		fields = ('name', 'hydropower', 'docfile')

	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		for field in iter(self.fields):
			self.fields[field].widget.attrs.update({
				'class': 'form-control'
			})




class UserCreateForm(UserCreationForm):
    # email = forms.EmailField(max_length=200, help_text='Required')

    def __init__(self, *args, **kwargs):
        super(UserCreateForm, self).__init__(*args, **kwargs)
        self.fields['username'].widget.attrs['class'] = 'form-control'
        # self.fields['email'].widget.attrs['class'] = 'form-control'
        self.fields['password1'].widget.attrs['class'] = 'form-control'
        self.fields['password2'].widget.attrs['class'] = 'form-control'

    class Meta:
        model = User
        fields = ('username', 'password1', 'password2')


    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in iter(self.fields):
            self.fields[field].widget.attrs.update({
				'class': 'form-control'
			})




