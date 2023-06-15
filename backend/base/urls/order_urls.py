from django.urls import path
from base.views import order_views as views


urlpatterns = [
    path('', views.getOrders, name="order"),
    path("add/", views.addOrderItems, name="orders-add"),
    path("allorders/", views.getMyOrders, name="user-all-orders"),
    path("paid/<str:pk>/<str:method>/", views.updateOrderPaid, name="update-order"),
    path("delivered/<str:pk>/<str:method>/", views.updateOrderDelivery, name="update-delivery"),
    path("<str:pk>/", views.getOrderById, name="user-order"),
]
