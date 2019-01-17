from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.http import HttpResponse

from hydro import settings
from .models import UserRole


from .models import UserRole


class UserRoleCreateForm(forms.ModelForm):
    # can_edit = forms.BooleanField(required=False, label="User Who Can Edit Only:")
    # can_delete = forms.BooleanField(required=False, label="User Who Can Delete Only:")

    class Meta:
        model = UserRole
        fields = ('user', 'can_edit', 'can_delete')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['user'].widget.attrs.update({
            'class': 'form-control'
        })


class UserCreateForm(UserCreationForm):
    # email = forms.EmailField(max_length=200, help_text='Required')

    def __init__(self, *args, **kwargs):
        super(UserCreateForm, self).__init__(*args, **kwargs)
        self.fields['username'].widget.attrs['class'] = 'form-control'
        # self.fields['email'].widget.attrs['class'] = 'form-control'
        self.fields['password1'].widget.attrs['class'] = 'form-control'
        self.fields['password2'].widget.attrs['class'] = 'form-control'

    class Meta:
        model = User
        fields = ('username', 'password1', 'password2')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in iter(self.fields):
            self.fields[field].widget.attrs.update({
                'class': 'form-control'
            })