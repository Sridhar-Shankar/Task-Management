import React from "react";
import styles from "./Register.module.css";
import Banner from "../../UI/Banner";

function Register() {
  return (
    <main>
      <Banner />
      <div className={styles.form}>
        <h1>Register</h1>
        <div className={styles.inputGroup}>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Confirm Password" />
          <input type="password" placeholder=" Password" />
        </div>
        <button>Register</button>
        <p>Have no account yet?</p>
        <button>Login</button>
      </div>
    </main>
  );
}

export default Register;
