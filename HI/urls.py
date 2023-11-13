# financial_app/urls.py

from django.urls import path
from .views import FinancialDataListCreateView, FinancialData

urlpatterns = [
    path('financial_analysis/', FinancialData , name= 'FinancialData'),
    path('api/financial-data/', FinancialDataListCreateView.as_view(), name='financial_data_api'),
]