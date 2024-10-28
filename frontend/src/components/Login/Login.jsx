import React, { useState } from "react";
import styles from "./Login.module.css";
import Banner from "../../UI/Banner";
import { Link, useNavigate } from "react-router-dom";
import Eye from "../../UI/Eye/Eye";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [inputType, setInputType] = useState("password");
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleEye = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <main>
      <Toaster />
      <Banner />
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.header}>Login</h1>
        <div className={styles.inputGroup}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={styles.email}
            onChange={handleChange}
          />
          <div className={styles.inputPwdGroup}>
            <input
              type={inputType}
              name="password"
              placeholder="Password"
              className={styles.password}
              onChange={handleChange}
            />
            <span className={styles.eye}>
              <Eye inputType={inputType} toggleEye={toggleEye} />
            </span>
          </div>
        </div>
        <button className={styles.login} type="submit">
          Log in
        </button>
        <p>Have no account yet?</p>
        <Link to="/register">
          <button type="button" className={styles.register}>
            Register
          </button>
        </Link>
      </form>
    </main>
  );
};

export default Login;
