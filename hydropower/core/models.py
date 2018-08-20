from django.db import models
from django.contrib.gis.db.models import PointField
from jsonfield import JSONField

# Create your models here.


class Province(models.Model):
    name = models.CharField(max_length=100)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class District(models.Model):
    name = models.CharField(max_length=100)
    province = models.ForeignKey(Province, related_name="district",  on_delete=models.CASCADE)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class GapaNapa(models.Model):
    name = models.CharField(max_length=200)
    district = models.ForeignKey(District, related_name="gapanapa",  on_delete=models.CASCADE)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class Hydropower(models.Model):
    province = models.ForeignKey(Province, related_name="hydropower",  on_delete=models.CASCADE, null=True, blank=True)
    district = models.ForeignKey(District, related_name="hydropower",  on_delete=models.CASCADE, null=True, blank=True)
    gapanapa = models.ForeignKey(GapaNapa, related_name="hydropower",  on_delete=models.CASCADE, null=True, blank=True)
    project = models.CharField(max_length=200)
    capacity = models.FloatField()
    river = models.CharField(max_length=100)
    lic_number = models.CharField(max_length=100, null=True, blank=True)
    issue_date = models.CharField(max_length=50)
    validity = models.CharField(max_length=100)
    promoter = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    latlong = PointField(null=True, blank=True)
    license_type = models.CharField(max_length=100)
    date_of_operation = models.CharField(max_length=100)
    other_properties = JSONField(null=True, blank=True)

    class Meta:
        ordering = ['project']

    def __str__(self):
        return self.project