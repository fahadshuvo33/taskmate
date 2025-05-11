from django.contrib import admin
from tasks.models import Task, PersonalInfo

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'additional_data', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('title', 'description')
    
@admin.register(PersonalInfo)   
class PersonalInfoAdmin(admin.ModelAdmin):
    list_display = ('name', 'email')
    list_filter = ('name',)
    search_fields = ('name', 'email')
