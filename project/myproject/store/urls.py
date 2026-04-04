from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('delete/<int:id>/', views.delete_product, name='delete'),
    path('edit/<int:id>/', views.edit_product, name='edit'),
]