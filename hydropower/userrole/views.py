from django.shortcuts import render, redirect, get_object_or_404
from django.urls import reverse_lazy, reverse
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from django.contrib.auth.models import User
from django.views.generic import TemplateView
from django.views import generic

from .models import UserRole
from .forms import UserRoleCreateForm, UserCreateForm

# Create your views here.


class UserRoleListView(ListView):
    model = UserRole
    form_class = UserRoleCreateForm
    template_name = 'userrole/userrole_list.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        try:
            context['userrole'] = UserRole.objects.all()
        except:
            print("userrole doesnot exist")
        context['users'] = User.objects.all()
        return context

    def get_success_url(self):
        success_url = reverse_lazy('userrole:manage_users')
        return success_url


class UserRoleDetailView(DetailView):
    model = UserRole
    template_name = 'userrole/userrole_detail.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        try:
            context['userrole'] = UserRole.objects.get(id=self.kwargs['urole_id'])
        except:
            print("userrole doesnot exist")
        context['users'] = User.objects.all()
        return context

    def get_success_url(self):
        success_url = reverse_lazy('userrole:manage_users')
        return success_url


class UserRoleCreateView(CreateView):

    model = UserRole
    form_class = UserRoleCreateForm
    template_name = 'userrole/userrole_create_form.html'

    def get_initial(self):
        user = User.objects.latest('date_joined')
        return {
            'user': user
        }

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        try:
            context['userrole'] = UserRole.objects.all()
        except:
            print("userrole doesnot exist")
        context['users'] = User.objects.all()
        return context

    def get_success_url(self):
        success_url = reverse_lazy('userrole:manage_users')
        return success_url


class UserRoleUpdateView(UpdateView):
    model = UserRole
    template_name = 'userrole/userrole_create_form.html'
    form_class = UserRoleCreateForm

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        try:
            context['userrole'] = UserRole.objects.all()
        except:
            print("userrole doesnot exist")
        context['users'] = User.objects.all()
        return context

    def get_success_url(self):
        success_url = reverse_lazy('userrole:manage_users')
        return success_url


class UserRoleDeleteView(DeleteView):
    model = UserRole
    template_name = 'userrole/userrole_delete.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        try:
            context['userrole'] = UserRole.objects.get(id=self.kwargs['urole_id'])
        except:
            print("userrole doesnot exist")
        context['users'] = User.objects.all()
        return context

    def get_success_url(self):
        success_url = reverse_lazy('userrole:manage_users')
        return success_url


class ManageUserView(TemplateView):
    template_name = 'userrole/manage_users.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        try:
            context['userrole'] = UserRole.objects.all()
            # context['userrole'] = UserRole.objects.get(user=self.request.user)
        except:
            print("userrole doesnot exist")
        context['users'] = User.objects.all()
        return context


class SignUp(generic.CreateView):
    form_class = UserCreateForm
    success_url = reverse_lazy('userrole:userrole_create')
    template_name = 'userrole/signup.html'



