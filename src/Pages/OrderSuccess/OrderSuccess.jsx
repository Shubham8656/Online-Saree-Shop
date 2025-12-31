import { Link } from "react-router-dom";
import "./OrderSuccess.css";

function OrderSuccess() {
  return (
    <div className="order-success">
      <div className="order-success-card">
        <div className="order-success-icon">🎉</div>

        <h1>Order Placed!</h1>
        <p>
          Thank you for shopping with us.  
          Your sarees will be delivered soon.
        </p>

        <Link to="/shop" className="order-success-btn">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccess;
