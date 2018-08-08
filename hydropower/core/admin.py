from django.contrib import admin

# Register your models here.
from .models import Province, District, GapaNapa, Hydropower
	
admin.site.register(Province)
admin.site.register(District)
admin.site.register(GapaNapa)
admin.site.register(Hydropower)