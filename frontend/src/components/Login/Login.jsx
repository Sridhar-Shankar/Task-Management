import React from "react";
import styles from "./Login.module.css";
import Banner from "../../UI/Banner";

function Login() {
  return (
    <main>
      <Banner />
      <div className={styles.form}>
        <h1>Login</h1>
        <div className={styles.inputGroup}>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
        </div>
        <button>Login</button>
        <p>Have no account yet?</p>
        <button>Register</button>
      </div>
    </main>
  );
}

export default Login;
