import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

function Header() {
  const { totalItems } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setOpen(false);
    navigate("/login");
  };

  return (
    <header className="header">
      {/* LEFT: LOGO */}
      <div className="header-left">
        <div className="logo">Shrutika Saree Shop</div>
      </div>

      {/* CENTER: SEARCH */}
      <div className="header-center">
        <input
          type="text"
          placeholder="Search sarees..."
          className="search-input"
        />
      </div>

      {/* RIGHT: NAV + CART + PROFILE */}
      <div className="header-right">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>

        {user && (
          <Link to="/cart" className="cart-link">
            🛒
            {totalItems > 0 && (
              <span className="cart-count">{totalItems}</span>
            )}
          </Link>
        )}

        {!user ? (
          <Link to="/login" className="login-btn">Login</Link>
        ) : (
          <div className="profile-wrapper">
            <img
              src={user.photoURL || "https://i.pravatar.cc/40"}
              alt="profile"
              className="profile-img"
              onClick={() => setOpen(!open)}
            />

            {open && (
              <div className="profile-dropdown">
                <p className="profile-email">{user.email}</p>
                <Link
                  to="/orders"
                  className="profile-link"
                  onClick={() => setOpen(false)}
                >
                  My Orders
                </Link>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
