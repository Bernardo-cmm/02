import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import styles from "./Login.module.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate("/admin");
    } else {
      alert("Credenciais inválidas");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Login</h2>
        <input
          className={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Usuário"
        />
        <input
          className={styles.input}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
        />
        <button className={styles.button} type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
