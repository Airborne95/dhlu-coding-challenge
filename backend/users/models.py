from django.db import models

# Create your models here.
class User(models.Model):
    # By setting blank=False for name and blank=True for other attributes, the model can save to the DB when only name is given.
    name = models.CharField(max_length=200, blank=False)
    email = models.EmailField(max_length=200, blank=True)
    phone = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return self.name
