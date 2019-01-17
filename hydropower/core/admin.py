from django.contrib import admin

# Register your models here.
from .models import Province, District, GapaNapa, Hydropower, Gislayer, GisStyle, Document
	
admin.site.register(Province)
admin.site.register(District)
admin.site.register(GapaNapa)
admin.site.register(Hydropower)
admin.site.register(Gislayer)
admin.site.register(GisStyle)
admin.site.register(Document)