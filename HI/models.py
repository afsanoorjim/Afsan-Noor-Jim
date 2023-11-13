# financial_app/models.py

from django.db import models

class MonthlyFinancialData(models.Model):
    month = models.DateField()
    income = models.DecimalField(max_digits=10, decimal_places=2)
    expenses = models.DecimalField(max_digits=10, decimal_places=2)
    debts = models.DecimalField(max_digits=10, decimal_places=2)
    assets = models.DecimalField(max_digits=10, decimal_places=2)
    

    def point(self):
        return str((self.income - self.expenses)*(self.debts%10)*(self.assets%10))

    def __str__(self) -> str:
        return f"Month: {self.month}"