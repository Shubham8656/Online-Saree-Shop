import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import CartProvider from "./context/CartContext";
import AuthProvider from "./context/AuthContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
     <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
