import { Routes, Route } from "react-router-dom";
import HomeScreen from "../screens/HomeScreen";
import ProductScreen from "../screens/ProductScreen";
import CartScreen from "../screens/CartScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/Register";
import ProfileScreen from "../screens/ProfileScreen";
import ShippingScreen from "../screens/ShippingScreen";
import PaymentScreen from "../screens/PaymentScreen";

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
    </Routes>
  );
}

export default Router;
