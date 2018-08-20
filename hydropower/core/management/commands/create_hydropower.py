import sys
import argparse

from django.core.management.base import BaseCommand
from django.contrib.gis.geos import Point

import pandas as pd

from core.models import Province, District, Hydropower, GapaNapa


class Command(BaseCommand):
    help = 'load hydropower data from hydropower csv file'

    def add_arguments(self, parser):
        parser.add_argument("-f", type=argparse.FileType(), required=True)

    def handle(self, *args, **options):
        df = pd.read_csv(sys.argv[3]).fillna(value=0)
        for row in range(0, len(df)):
            pnt = Point(df['Latitude'][row], df['Longitude'][row])
            hydropower, created = Hydropower.objects.get_or_create(
                    capacity= df['Capacity (MW)'][row],
                    river= df['River'][row],
                    project = df['Project'][row],
                    lic_number = df['Lic No'][row],
                    issue_date = df['Isuue Date'][row],
                    validity = df['Validity'][row],
                    promoter = df['Promoter'][row],
                    address = df['Address'][row],
                    latlong = pnt,
                    license_type = df['License Type'][row],
                    date_of_operation = df['Date of Operation'][row]           
                                      
                )
            if created:
                self.stdout.write('Sucessfully loaded %s' % hydropower)