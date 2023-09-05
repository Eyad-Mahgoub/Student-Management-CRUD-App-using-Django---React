from django.urls import path
from .views import StudentView

urlpatterns = [
    path('', StudentView.as_view(), name="getall"),
    path('/<int:pk>', StudentView.as_view(), name="getall")
]
