import sys
import argparse

from django.core.management.base import BaseCommand

import pandas as pd

from core.models import GapaNapa, District


class Command(BaseCommand):
    help = 'load gapanapa data from hydropower csv file'

    def add_arguments(self, parser):
        parser.add_argument("-f", type=argparse.FileType(), required=True)

    def handle(self, *args, **options):
        df = pd.read_csv(sys.argv[3])
        for row in range(0, 573):
            gapanapa, created = GapaNapa.objects.get_or_create(
                name=df['Municipality'][row],
                district=District.objects.get(name=df['District'][row]),
                )
            if created:
                self.stdout.write('Successfully created %s' % gapanapa)
