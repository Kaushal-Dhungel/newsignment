from .models import *
from rest_framework.views import APIView
from .serializers import *
from .models import *
from rest_framework.response import Response
from django.http import Http404
from rest_framework import status
from django.db import IntegrityError
from django.contrib.auth.models import User,auth
from django.contrib.auth import authenticate,logout
from django.core.paginator import Paginator
from rest_framework.settings import api_settings

# Create your views here.
class LoginUser(APIView):
    def post(self,request,*args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')

        print(email,password)
        user = auth.authenticate(username=email,password=password)
        print(user)
        if user is not None:
            auth.login(request,user)
            return Response({"Login Successful"},status= status.HTTP_200_OK)
        else:
            return Response({"Invalid Credentials. Please Try Again."},status=status.HTTP_400_BAD_REQUEST)


class LogoutUser(APIView):
    def get(self,request,*args, **kwargs):
        try:
            logout(request)
            print("logout successful")
            return Response({"Logout Successful"},status= status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({"Unknown Error Occured"},status=status.HTTP_400_BAD_REQUEST)
        
class BlogPostView(APIView):

    # pagination_class = PageNumberPagination
    # pagination_class = api_settings.DEFAULT_PAGINATION_CLASS

    def get(self,request,*args,**kwargs):
        whichShow = request.query_params.get('whichshow')
        print(whichShow)
        try:
            if whichShow == "all":
                data = Blog.objects.all()
        
            else:
                data = Blog.objects.filter(author= request.user.id)

            # page = self.paginate_queryset(data)
            # if page is not None:
            #     blogs = BlogSerializer(page, many=True)
            #     return self.get_paginated_response(blogs.data)
            
            blogs = BlogSerializer(data,many = True)
            return Response(blogs.data,status= status.HTTP_200_OK)
        
        except Exception as e :
            print(e)
            return Response({"data not found"},status=status.HTTP_400_BAD_REQUEST)

    # @property
    # def paginator(self):
    #     """
    #     The paginator instance associated with the view, or `None`.
    #     """
    #     if not hasattr(self, '_paginator'):
    #         if self.pagination_class is None:
    #             self._paginator = None
    #         else:
    #             self._paginator = self.pagination_class()
    #     return self._paginator

    # def paginate_queryset(self, queryset):
    #      """
    #      Return a single page of results, or `None` if pagination is disabled.
    #      """
    #      if self.paginator is None:
    #          return None
    #      return self.paginator.paginate_queryset(queryset, self.request, view=self)
    
    # def get_paginated_response(self, data):
    #      """
    #      Return a paginated style `Response` object for the given output data.
    #      """
    #      assert self.paginator is not None
    #      return self.paginator.get_paginated_response(data) 


    def post(self,request,*args,**kwargs):

        user = User.objects.get(id = request.user.id)

        mydict = {
            'author': request.user.id,
            'title': request.data['title'],
            'details': request.data['detail'],
            'thumbnail': request.data['thumbnail'],
            'slug': "abc"
        }

        try:
            serializer = BlogSerializer(data = mydict)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            # print(serializer.data)
            return Response({"saving successful"},status= status.HTTP_201_CREATED)
        except Exception as e:
            print(e)
            print("lol")
            return Response({"saving failed"},status=status.HTTP_400_BAD_REQUEST)

class BlogPostDetailView(APIView):
    def get(self,request,slug,*args,**kwargs):
        try:
            data = Blog.objects.get(slug= slug)
            blog = BlogSerializer(data)
            return Response(blog.data,status= status.HTTP_200_OK)
        
        except Exception as e :
            print(e)
            return Response({"data not found"},status=status.HTTP_400_BAD_REQUEST)

    def delete(self,request,slug,*args, **kwargs):
        print(slug)
        try:
            item = Blog.objects.get(author = request.user.id,slug = slug)
            item.delete()
            
            data = Blog.objects.filter(author= request.user.id)
            blogs = BlogSerializer(data,many = True)
            return Response(blogs.data,status= status.HTTP_200_OK)

        except Exception as e:
            print(e)
            return Response({'sorry'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)