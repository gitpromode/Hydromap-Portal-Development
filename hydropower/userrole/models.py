from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class UserRole(models.Model):
    user = models.OneToOneField(User, related_name="userrole", on_delete=models.CASCADE)
    can_edit = models.BooleanField(default=False)
    can_delete = models.BooleanField(default=False)

    class Meta:
        ordering = ['user']

    def __str__(self):
        return "(user = %s, can_edit = %s, can_delete = %s)" % (self.user.username, self.can_edit, self.can_delete)