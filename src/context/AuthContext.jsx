import { createContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 🔑 CRITICAL

  // 🔄 Listen to auth state (runs on refresh too)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // 🔑 auth state resolved
    });

    return () => unsubscribe();
  }, []);

  // 📧 Email/password signup
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // 🔐 Email/password login
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // 🔑 Google login
  const loginWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // 🚪 Logout
  const logout = () => {
    return signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signup,
        login,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
