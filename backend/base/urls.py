from django.urls import path
from . import views
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('products/', views.getProducts, name="products"),
    path('product/<str:pk>', views.getProduct, name="product"),
    path('users/register/', views.registerUser, name="register_user"),
    path('users/login/', views.MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('users/profile/', views.getUserProfile, name="user-profile"),
    path('users/', views.getUsers, name="users")
]
