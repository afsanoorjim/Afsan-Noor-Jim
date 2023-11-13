from rest_framework import serializers
from .models import MonthlyFinancialData

class FinancialDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = MonthlyFinancialData
        fields = '__all__'