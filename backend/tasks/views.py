from django.shortcuts import render
# Ensure Django REST Framework is installed and properly imported
from rest_framework.viewsets import ModelViewSet
from .models import Task, PersonalInfo
from .serializers import TaskSerializer, PersonalInfoSerializer

class TaskViewSet(ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class PersonalInfoViewSet(ModelViewSet):
    queryset = PersonalInfo.objects.all()
    serializer_class = PersonalInfoSerializer

# Create your views here.
