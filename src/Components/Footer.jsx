import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        {/* Brand */}
        <div className="footer-section">
          <h3 className="footer-logo">ShrutikaSareeShop</h3>
          <p>
            Premium Indian sarees – Silk, Cotton, Party Wear & Wedding
            collections.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/cart">Cart</Link>
        </div>

        {/* Categories */}
        <div className="footer-section">
          <h4>Categories</h4>
          <p>Banarasi Sarees</p>
          <p>Kanjeevaram Sarees</p>
          <p>Cotton Sarees</p>
          <p>Party Wear Sarees</p>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h4>Contact</h4>
          <p>📍 Mumbai, Maharashtra, India</p>
          <p>📧 support@sareeshop.com</p>
          <p>📞 +91 9930434149</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        © 2025 SareeShop. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
