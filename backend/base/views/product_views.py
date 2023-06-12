import json
from typing import Dict, Any

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from ..models import Product
from ..products import products
from ..serializers import ProductSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status

@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProductByCategory(request, pk):
    products = Product.objects.filter(category=pk)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def getAllCategories(request):
    products = Product.objects.all().order_by("_id")
    newproducts = []
    lastSeenId = ""
    for row in products:
        if row.category == lastSeenId:
              pass
        else:
            newproducts.append(row.category)
            lastSeenId = row.category
    return  Response(newproducts)
