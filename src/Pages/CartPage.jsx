import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const {
    cartItems,
    increaseQty,
    decreaseQty,
    totalPrice,
  } = useContext(CartContext);
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return <h2 className="empty-cart">Your cart is empty 🛒</h2>;
  }

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.name} />

          <div className="cart-info">
            <h4>{item.name}</h4>
            <p>₹{item.price}</p>

            <div className="qty-controls">
              <button onClick={() => decreaseQty(item.id)}>-</button>
              <span>{item.qty}</span>
              <button onClick={() => increaseQty(item.id)}>+</button>
            </div>
          </div>
        </div>
      ))}

      <div className="cart-total">
        <h3>Total: ₹{totalPrice}</h3>
        <button onClick={() => navigate("/checkout")}>Proceed to Checkout</button>
      </div>
    </div>
  );
}

export default CartPage;
