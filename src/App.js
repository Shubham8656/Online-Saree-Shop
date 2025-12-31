import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Components/Header";
import Footer from "./Components/Footer";

import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import CartPage from "./Pages/CartPage";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import Checkout from "./Pages/Checkout/Checkout";
import OrderSuccess from "./Pages/OrderSuccess/OrderSuccess";
import MyOrders from "./Pages/MyOrders/MyOrders";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/orders" element={<MyOrders />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
