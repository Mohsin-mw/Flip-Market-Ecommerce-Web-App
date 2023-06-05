from django.urls import path
from django.views.decorators.csrf import csrf_exempt

from base.views import product_views as views

urlpatterns = [
    path('', views.getProducts, name="products"),
    path('electronics', views.getProductsElectronics, name="products-electronics"),
    path('phones', views.getProductsPhones, name="products-electronics"),
    path('laptops', views.getProductsLaptops, name="products-electronics"),
    path('<str:pk>', views.getProduct, name="product"),
]
