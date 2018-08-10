from django.db import models
from django.contrib.gis.db.models import PointField

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
    shape = models.CharField(max_length=50)
    name = models.CharField(max_length=200)
    proj_size = models.FloatField(default=0)
    trans_cate = models.IntegerField(default=0)
    province = models.ForeignKey(Province, related_name="hydropower",  on_delete=models.CASCADE)
    district = models.ForeignKey(District, related_name="hydropower",  on_delete=models.CASCADE)
    gapanapa = models.ForeignKey(GapaNapa, related_name="hydropower",  on_delete=models.CASCADE)
    river = models.CharField(max_length=100)
    start_date = models.CharField(max_length=50)
    latlong = PointField(null=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name
