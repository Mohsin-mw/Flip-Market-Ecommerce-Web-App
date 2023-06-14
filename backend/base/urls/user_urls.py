from django.urls import path
from ..views import user_views as views
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('register/', views.registerUser, name="register_user"),
    path('login/', views.MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('profile/', views.getUserProfile, name="user-profile"),
    path('profile/update/', views.updateUsersProfile, name="user-profile-update"),
    path('', views.getUsers, name="users"),

    path('<str:pk>/', views.getUserById
         , name="user"),


    path('update/<str:pk>/', views.updateUser, name="update-user"),

    path('delete/<str:pk>/', views.deleteUser, name="delete-user")
]
