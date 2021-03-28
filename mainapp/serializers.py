from rest_framework import serializers
from .models import *

class BlogSerializer(serializers.ModelSerializer):
    get_author_name = serializers.ReadOnlyField()
    class Meta:
        model = Blog
        fields = "__all__"  