from django.db import models
from django.template.defaultfilters import slugify
from django.contrib.auth.models import User
# Create your models here.

class Blog(models.Model):

    # CHOICES_CATEGORY = (
    # ('wholistique', 'wholistique'),
    # ('better programming', 'better programming'),
    # ('technology', 'technology'),
    # ('sports', 'sports'),
    # ('travel', 'travel'),
    # )

    author = models.ForeignKey(User,on_delete= models.CASCADE)
    # category = models.CharField(max_length=30,choices = CHOICES_CATEGORY)
    title = models.CharField(max_length=400,null= False, blank = False)
    thumbnail = models.ImageField(upload_to='blogs/')
    details = models.TextField(null= False, blank = False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    slug = models.SlugField()

    def save(self,*args, **kwargs):
        original_slug = slugify(f"{self.title}")
        queryset = Blog.objects.all().filter(slug__iexact = original_slug).count()  

        count = 1
        slug = original_slug 

        while(queryset):  
            slug = original_slug + "-" + str(count)
            count += 1 
            queryset = Blog.objects.all().filter(slug__iexact = slug).count()  
 
        self.slug = slug

        super().save(*args, **kwargs)
    
    @property
    def get_author_name(self):
        return self.author.username

    def __str__(self):
        return str(f"{self.author.username}---{self.id}")