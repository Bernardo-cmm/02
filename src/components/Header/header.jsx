import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/themecontext";
import { useAuth } from "../../context/authcontext";

const Header = () => {
  const { darkMode, setDarkMode } = useTheme();
  const { isAuthenticated, logout } = useAuth();

  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        {isAuthenticated && <Link to="/products">Admin</Link>}
        {!isAuthenticated ? (
          <Link to="/login">Login</Link>
        ) : (
          <button onClick={logout}>Logout</button>
        )}
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Light" : "Dark"} Mode
        </button>
      </nav>
    </header>
  );
};

export default Header;
