import React from "react";
import styles from "./footer.module.css";
import { BsGithub } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.dir}>
            &copy; {new Date().getFullYear()} E-commerce Admin Panel
          </p>
          <div className={styles.links}>
            <a
              className={styles.githubLink}
              href="https://github.com/Bernardo-cmm/02"
              rel="noopener noreferrer"
              target="_blank"
            >
              <BsGithub />
              Autores: Evelyn / Bianca / Bernardo
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
