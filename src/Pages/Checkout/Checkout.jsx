import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../../Components/Loading/Loading";
import { db } from "../../firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

function Checkout() {
  const { cartItems, totalItems, totalPrice, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) return <Loading text="Placing your order..." />


  const placeOrder = async () => {
    console.log(user)
    if (!address || !phone) {
      alert("Please fill all details");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "users", user.uid, "orders"), {
        userId: user.uid,
        items: cartItems,
        totalItems,
        totalPrice,
        address,
        phone,
        createdAt: new Date(),
      });

      // alert("Order placed successfully!");
      clearCart();
      await setDoc(doc(db, "carts", user.uid), { items: [] });
      navigate("/order-success");
    } catch (err) {
      alert("Failed to place order", err);
      console.log(err)
    }

    setLoading(false);
  };
  console.log("User")
  return (
    <div className="checkout-page">
      <h2>Checkout</h2>

      <div className="checkout-section">
        <h4>Delivery Address</h4>
        <textarea
          placeholder="Enter full address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <input
          type="tel"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="checkout-summary">
        <p>Total Items: {totalItems}</p>
        <h3>Total: ₹{totalPrice}</h3>
      </div>

      <button
        className="place-order-btn"
        onClick={placeOrder}
        disabled={loading}
      >
        {loading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
}

export default Checkout;
