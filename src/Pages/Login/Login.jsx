import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";

import "./Login.css";

function Login() {
    const { login, loginWithGoogle, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await login(email, password);
            navigate("/shop"); // redirect after login
        } catch (err) {
            setError("Invalid email or password");
        }
    };
    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle();
            navigate("/shop");
        } catch (err) {
            alert("Google login failed");
        }
    };
    if (loading) return <Loading />
    return (
        <div className="login-page">
            <h2>Login</h2>

            {error && <p className="error">{error}</p>}

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Login</button>
            </form>
            <div className="divider">OR</div>

            <button
                type="button"
                className="google-btn"
                onClick={handleGoogleLogin}
            >
                Continue with Google
            </button>

            <p className="login-footer">
                Don’t have an account?{" "}
                <Link to="/signup">Create one</Link>
            </p>
        </div>
    );
}

export default Login;
