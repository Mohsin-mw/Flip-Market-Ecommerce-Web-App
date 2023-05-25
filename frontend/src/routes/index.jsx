import { Routes, Route } from "react-router-dom";
import HomeScreen from "../screens/HomeScreen";
import ProductScreen from "../screens/ProductScreen";
import CartScreen from "../screens/CartScreen";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/cart/:id?" element={<CartScreen />} />
    </Routes>
  );
}

export default Router;
