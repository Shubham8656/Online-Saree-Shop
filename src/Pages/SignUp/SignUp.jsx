import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "../Login/Login.css";

function Signup() {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await signup(email, password);
      navigate("/shop"); // auto login after signup
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-page">
      <h2>Create Account</h2>

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

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit">Sign Up</button>
      </form>

      <p className="login-footer">
        Already have an account?{" "}
        <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Signup;
