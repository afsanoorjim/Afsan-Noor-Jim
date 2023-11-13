from django.shortcuts import render
from django.http import JsonResponse
from .models import MonthlyFinancialData
from rest_framework import generics
from .models import MonthlyFinancialData
from .serializers import FinancialDataSerializer



class FinancialDataListCreateView(generics.ListCreateAPIView):
    queryset = MonthlyFinancialData.objects.all()
    serializer_class = FinancialDataSerializer


def FinancialData(request):
    
    financial_data = MonthlyFinancialData.objects.last()
    data_with_points = [
        {'month': financial_data.month, 'point': financial_data.point()}
        ]

    return JsonResponse(data_with_points, safe=False)