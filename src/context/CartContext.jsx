import { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
export const CartContext = createContext();

function CartProvider({ children }) {

  const { user, loading: authLoading } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };
  const clearCart = () => {
    setCartItems([]);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  /* 🔄 FETCH CART FROM FIRESTORE (ON LOGIN / REFRESH) */
  useEffect(() => {
    if (authLoading) return

    const fetchCart = async () => {
      if (!user) {
        setCartItems([]);
        setIsInitialized(true);
        return;
      }

      try {
        const cartRef = doc(db, "carts", user.uid);
        const snap = await getDoc(cartRef);

        if (snap.exists()) {
          setCartItems(snap.data().items || []);
        } else {
          setCartItems([]);
        }
      } catch (err) {
        console.error("Failed to fetch cart", err);
        setCartItems([]);
      }

      setIsInitialized(true);
    };
    setIsInitialized(false);
    fetchCart();
  }, [user, authLoading]);

  /* 💾 SYNC CART TO FIRESTORE (BACKGROUND, DEBOUNCED) */
  useEffect(() => {
    if (!user || !isInitialized) return

    const timeout = setTimeout(async () => {
      try {
        await setDoc(
          doc(db, "carts", user.uid),
          {
            items: cartItems,
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        );
      } catch (err) {
        console.error("Failed to save cart", err);
      }
    }, 500); // debounce

    return () => clearTimeout(timeout);
  }, [cartItems, user, isInitialized]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQty,
        decreaseQty,
        clearCart,
        totalPrice,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
