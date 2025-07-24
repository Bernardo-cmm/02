import React from "react";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        &copy; {new Date().getFullYear()} E-commerce Admin Panel
      </div>
    </footer>
  );
};

export default Footer;
