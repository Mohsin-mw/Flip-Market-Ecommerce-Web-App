from django.urls import path
from django.views.decorators.csrf import csrf_exempt

from base.views import product_views as views

urlpatterns = [
    path('', views.getProducts, name="products"),
    path('allcategories', views.getAllCategories, name="all-categories"),
    path('category/<str:pk>', views.getProductByCategory, name="category"),
    path('create/', views.createProduct, name="create-product"),
    path('upload/', views.uploadImage, name="image-upload"),
    path('update/<str:pk>/', views.updateProduct, name="update-product"),
    path('delete/<str:pk>/', views.deleteProduct, name="delete-product"),
    path('<str:pk>/reviews/', views.createReview, name="create-review"),
    path('<str:pk>', views.getProduct, name="product"),
]
