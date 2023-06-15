from django.urls import path
from base.views import order_views as views


urlpatterns = [
    path('', views.getOrders, name="order"),
    path("add/", views.addOrderItems, name="orders-add"),
    path("allorders/", views.getMyOrders, name="user-all-orders"),
    path("<str:pk>/", views.getOrderById, name="user-order"),
]
