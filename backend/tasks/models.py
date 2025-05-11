from django.db import models

class Task(models.Model):
    title = models.CharField(max_length=200, default="Default Title")
    description = models.TextField(blank=True, default="Default Description")
    created_at = models.DateTimeField(auto_now_add=True)
    additional_data = models.JSONField(blank=True, null=True)  # For dynamic fields

    def __str__(self):
        return self.title

class PersonalInfo(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(blank=True, null=True)

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.pk and PersonalInfo.objects.exists():
            existing_instance = PersonalInfo.objects.first()
            existing_instance.name = self.name
            existing_instance.email = self.email
            existing_instance.save()
            return
            
        super().save(*args, **kwargs)