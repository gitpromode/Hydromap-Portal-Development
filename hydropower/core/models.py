from django.db import models
from django.contrib.gis.db.models import PointField
from colorfield.fields import ColorField
from jsonfield import JSONField
from django.core.exceptions import ValidationError

# Create your models here.


class Province(models.Model):
    name = models.CharField(max_length=100)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name

    def value(self):
        return self.hydropower.count()

    def districts(self):
        return self.district.values('name')

    def gapanapas(self):
        return self.district.values('gapanapa__name')
        

class District(models.Model):
    name = models.CharField(max_length=100)
    province = models.ForeignKey(Province, related_name="district",  on_delete=models.CASCADE)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name

    def value(self):
        return self.hydropower.count()

    def gapa(self):
        return self.gapanapa.values('name')


class GapaNapa(models.Model):
    name = models.CharField(max_length=200)
    district = models.ForeignKey(District, related_name="gapanapa",  on_delete=models.CASCADE)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name

    # def abc(self):
    #     return self.district.values('province')

LICENSE_TYPES=(
    ('0', 'Survey'),
    ('1', 'Generation'),
    ('2', 'Operation'),
    )

def get_years():
    years = []
    for year in range(2030, 2081):
        years.append((year, year))
    return years

def get_months():
    months = []
    for month in range(1, 13):
        months.append((month, month))
    return sorted(months, reverse=True)

def get_days():
    days = []
    for day in range(1, 33):
        days.append((day, day))
    return sorted(days, reverse=True)


class Hydropower(models.Model):
    province = models.ForeignKey(Province, related_name="hydropower",  on_delete=models.CASCADE, null=True, blank=True)
    district = models.ForeignKey(District, related_name="hydropower",  on_delete=models.CASCADE, null=True, blank=True)
    gapanapa = models.ForeignKey(GapaNapa, related_name="hydropower",  on_delete=models.CASCADE, null=True, blank=True)
    province_name = models.CharField(max_length=50, null=True, blank=True)
    district_name = models.CharField(max_length=50, null=True, blank=True)
    gapanapa_name = models.CharField(max_length=100, null=True, blank=True)
    project = models.CharField(max_length=200)
    capacity = models.FloatField(verbose_name="Capacity (MW)", null=True, blank=True)
    river = models.CharField(max_length=100)
    lic_number = models.CharField(max_length=100, null=True, blank=True)    
    issue_date_years = models.IntegerField(default=2030, null=True, choices=get_years())
    issue_date_months = models.IntegerField(default=1, null=True, choices=get_months())
    issue_date_days = models.IntegerField(default=1, null=True, choices=get_days())    
    validity_date_years = models.IntegerField(default=2030, null=True, choices=get_years())
    validity_date_months = models.IntegerField(default=1, null=True, choices=get_months())
    validity_date_days = models.IntegerField(default=1, null=True, choices=get_days())
    promoter = models.CharField(max_length=200)
    address = models.CharField(max_length=200) 
    latlong = PointField(null=True, blank=True)
    license_type = models.CharField(max_length=15, choices=LICENSE_TYPES, default=0)
    date_of_operation = models.CharField(max_length=100)
    image = models.ImageField(upload_to="hydropower/image/", null=True, blank=True)
    other_properties = JSONField(null=True, blank=True)
    hydro_summary = models.TextField(null=True, blank=True)

    class Meta:
        ordering = ['project']

    def __str__(self):
        return self.project

    @property
    def value(self):
        return self.hydropower.count()

    @property
    def issue_date(self):
        return "{}/{}/{}".format(self.issue_date_months, self.issue_date_days, self.issue_date_years)

    @property
    def validity_date(self):
        return "{}/{}/{}".format(self.validity_date_months, self.validity_date_days, self.validity_date_years)

    @property
    def latitude(self):
        return self.latlong.y if self.latlong else 0

    @property    
    def longitude(self):
        return self.latlong.x if self.latlong else 0

def validate_file_extension(value):
    if not value.name.endswith('.geojson'):
        raise ValidationError('Error message')


class Gislayer(models.Model):
    name = models.CharField(max_length=100)
    file = models.FileField(upload_to='geojsons/', null=True, blank=True, validators=[validate_file_extension])

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class GisStyle(models.Model):
    gislayer = models.OneToOneField(Gislayer, related_name="gisstyle", on_delete=models.CASCADE, null=True, blank=True)
    opacity = models.IntegerField(default=1, null=True)
    fill_opacity = models.FloatField(verbose_name="Fill Opacity", default=0.2, null=True)
    weight = models.IntegerField(default=1, null=True)
    dash_array = models.IntegerField(verbose_name="Dash Array", default=0, null=True)
    dash_offset = models.IntegerField(verbose_name="Dash Offset", default=0, null=True)
    # color = ColorField(default='#ffffff')
    color = models.CharField(max_length=200, default='#000000')
    # fill_color = ColorField(verbose_name="Fill Color", default='#ffffff')
    fill_color = models.CharField(verbose_name="Fill Color", max_length=200, default='#000000')


class Document(models.Model):
    name = models.CharField(max_length=100)
    hydropower = models.ForeignKey(Hydropower, related_name="document",  on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    docfile = models.FileField(upload_to='documents/', null=True, blank=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name