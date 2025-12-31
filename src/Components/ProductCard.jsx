import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


function ProductCard({ product }) {
  const {
    cartItems,
    addToCart,
    increaseQty,
    decreaseQty,
  } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  // Check if product is already in cart
  const cartItem = cartItems.find(
    (item) => item.id === product.id
  );
  const handleAddToCart = (product) => {
    if (!user) {
      navigate("/login"); // 🔥 redirect if not logged in
      return;
    }

    addToCart(product);
  };
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="price">₹{product.price}</p>

      {/* If product NOT in cart */}
      {!cartItem && (
        <button onClick={() => handleAddToCart(product)}>
          Add to Cart
        </button>
      )}

      {/* If product ALREADY in cart */}
      {cartItem && (
        <div className="qty-controls ">
          <button className="qty-btn" onClick={() => decreaseQty(product.id)}>-</button>
          <span className="qty-value">{cartItem.qty}</span>
          <button className="qty-btn" onClick={() => increaseQty(product.id)}>+</button>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
