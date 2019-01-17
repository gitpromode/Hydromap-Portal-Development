import sys
import argparse
import datetime

from django.core.management.base import BaseCommand
from django.contrib.gis.geos import Point

import pandas as pd

from core.models import Province, District, Hydropower, GapaNapa


class Command(BaseCommand):
    help = 'load hydropower data from hydropower csv file'

    def add_arguments(self, parser):
        parser.add_argument("-f", type=argparse.FileType(), required=True)

    def handle(self, *args, **options):
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


        df = pd.read_csv(sys.argv[3]).fillna(value=0)
        for row in range(0, 573):

            pnt = Point(df['Longitude'][row], df['Latitude'][row])
            province = int(df['Province'][row])
            hydropower, created = Hydropower.objects.get_or_create(
                    pk=df['S_No'][row],
                    province=Province.objects.get(name='Province ' + str(province)),
                    district=District.objects.get(name=df['District'][row]),
                    gapanapa=GapaNapa.objects.get(name=df['Municipality'][row], district__name=df['District'][row]),
                    province_name=province,
                    district_name=df['District'][row],
                    gapanapa_name=df['Municipality'][row],
                    project=df['Project'][row],
                    capacity=df['Capacity (MW)'][row],
                    river=df['River'][row],
                    lic_number=df['Lic No'][row],
                    issue_date_years=string_to_year(df['Isuue Date'][row]),
                    issue_date_months=string_to_month(df['Isuue Date'][row]),
                    issue_date_days=string_to_day(df['Isuue Date'][row]),
                    validity_date_years=string_to_year(df['Validity'][row]),
                    validity_date_months=string_to_month(df['Validity'][row]),
                    validity_date_days=string_to_day(df['Validity'][row]),
                    promoter=df['Promoter'][row],
                    address=df['Address'][row],
                    latlong = pnt,
                    license_type=df['License Type'][row],
                    date_of_operation=df['Date of Operation'][row]
                                      
                )
            if created:
                self.stdout.write('Sucessfully loaded %s' % hydropower)