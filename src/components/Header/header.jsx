import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { darkMode, setDarkMode } = useTheme();
  const { isAuthenticated, logout } = useAuth();

  return (
    <header style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <nav style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Link to="/">Home</Link>
        {isAuthenticated && <Link to="/admin">Produtos</Link>}

        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Modo Claro" : "Modo Escuro"}
        </button>

        {isAuthenticated ? (
          <button onClick={logout}>Sair</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
