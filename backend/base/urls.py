from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)



urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('products/', views.getProducts, name="products"),
    path('product/<str:pk>', views.getProduct, name="product"),
    path('user/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
]
