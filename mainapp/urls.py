from django.urls import path,include
from .views import *

urlpatterns = [
    path('login/',LoginUser.as_view() ),
    path('logout/',LogoutUser.as_view() ),
    path('blogs/',BlogPostView.as_view() ),
    path('blogdetail/<slug>',BlogPostDetailView.as_view() ),

]