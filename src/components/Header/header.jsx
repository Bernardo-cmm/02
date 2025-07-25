import React from "react";
import { Link } from "react-router";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/authcontext";
import { FaHome, FaMoon, FaSun } from "react-icons/fa";
import { IoExitSharp } from "react-icons/io5";
import styles from "./Header.module.css";

const Header = () => {
  const { darkMode, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.link}>
          <FaHome />
        </Link>

        {isAuthenticated && (
          <Link to="/admin" className={styles.link}>
            Produtos
          </Link>
        )}

        <button onClick={toggleTheme} className={styles.iconButton}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        {isAuthenticated ? (
          <button onClick={logout} className={styles.logoutButton}>
            Sair
          </button>
        ) : (
          <Link to="/login" className={styles.link}>
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
