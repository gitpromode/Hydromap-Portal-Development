import sys
import argparse

from django.core.management.base import BaseCommand
from django.contrib.gis.geos import Point

import pandas as pd

from core.models import GapaNapa, District, Province


class Command(BaseCommand):
    help = 'load district data from hydropower csv file'

    def add_arguments(self, parser):
        parser.add_argument("-f", type=argparse.FileType(), required=True)

    def handle(self, *args, **options):
        df = pd.read_csv(sys.argv[3])
        for row in range(0, 573):
            province = int(df['Province'][row])
            district, created = District.objects.get_or_create(
                province=Province.objects.get(name='Province ' + str(province)),
                name=df['District'][row],
                )
            if created:
                self.stdout.write('Successfully created %s' % district)
