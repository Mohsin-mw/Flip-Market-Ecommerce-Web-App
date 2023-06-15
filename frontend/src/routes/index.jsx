import { Routes, Route } from "react-router-dom";
import HomeScreen from "../screens/HomeScreen";
import ProductScreen from "../screens/ProductScreen";
import CartScreen from "../screens/CartScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/Register";
import ProfileScreen from "../screens/ProfileScreen";
import ShippingScreen from "../screens/ShippingScreen";
import PaymentScreen from "../screens/PaymentScreen";
import OrderScreen from "../screens/OrderScreen";
import OrderSummary from "../screens/OrderSummary";
import AllOrders from "../screens/AllOrders";
import UserListScreen from "../screens/UserListScreen";
import User from "../screens/User";
import ProductsListScreen from "../screens/ProductsListScreen";
import ProductEditScreen from "../screens/ProductEditScreen";
import AdminOrders from "../screens/AdminOrders";
function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/profile" element={<ProfileScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/cart/:id?" element={<CartScreen />} />
      <Route path="/shipping" element={<ShippingScreen />} />
      <Route path="/payment" element={<PaymentScreen />} />
      <Route path="/placeorder" element={<OrderScreen />} />
      <Route path="/summary/:id" element={<OrderSummary />} />
      <Route path="/orders" element={<AllOrders />} />
      <Route path="/admin/allusers" element={<UserListScreen />} />
      <Route path="/admin/users/:id/edit" element={<User />} />
      <Route path="/admin/allproducts" element={<ProductsListScreen />} />
      <Route path="/admin/products/:id/edit" element={<ProductEditScreen />} />
      <Route path="/admin/allorders" element={<AdminOrders />} />
    </Routes>
  );
}

export default Router;
