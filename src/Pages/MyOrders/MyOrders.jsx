import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../firebase";
import {
    collection,
    query,
    getDocs,
    orderBy,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import "./MyOrders.css";

function MyOrders() {
    const { user, loading: authLoading } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (authLoading) return;

        if (!user) {
            navigate("/login");
            return;
        }

        const fetchOrders = async () => {
            try {
                console.log("Logged in UID:", user.uid);
                const q = query(
                    collection(db, "users", user.uid,"orders"),
                    orderBy("createdAt", "desc")
                );
                const snapshot = await getDocs(q);
                snapshot.forEach(doc => {
                    console.log("ORDER DOC:", doc.id, doc.data());
                });
                console.log("snapshot :", snapshot);
                const ordersData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setOrders(ordersData);
            } catch (err) {
                console.error("Failed to fetch orders", err);
            }

            setLoading(false);
        };

        fetchOrders();
    }, [user, authLoading, navigate]);

    if (loading) return <Loading text="Loading your orders..." />;

    return (
        <div className="orders-page">
            <h2>My Orders</h2>

            {orders.length === 0 ? (
                <p>You have not placed any orders yet.</p>
            ) : (
                orders.map((order) => (
                    <div key={order.id} className="order-card">
                        <div className="order-header">
                            <span>
                                Order Date:{" "}
                                {order.createdAt?.toDate().toLocaleDateString()}
                            </span>
                            <span className="order-total">
                                ₹{order.totalPrice}
                            </span>
                        </div>

                        <div className="order-items">
                            {order.items.map((item) => (
                                <div key={item.id} className="order-item">
                                    <span>{item.name}</span>
                                    <span>× {item.qty}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default MyOrders;
