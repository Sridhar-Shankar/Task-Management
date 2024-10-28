import React, { useState } from "react";
import styles from "./Register.module.css";
import Banner from "../../UI/Banner";
import { useNavigate } from "react-router-dom";
import Eye from "../../UI/Eye/Eye"; 
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();

  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handlePassword = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  const handleConfirmPassword = () => {
    setConfirmPasswordType(
      confirmPasswordType === "password" ? "text" : "password"
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <main>
      <Banner />
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.header}>Register</h1>
        <div className={styles.inputGroup}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className={styles.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={styles.email}
            onChange={handleChange}
          />
          <div className={styles.inputPwdGroup}>
            <input
              type={passwordType}
              name="password"
              placeholder="Password"
              className={styles.password}
              onChange={handleChange}
            />
            <span className={styles.eye}>
              <Eye inputType={passwordType} toggleEye={handlePassword} />
            </span>
          </div>
          <div className={styles.inputPwdGroup}>
            <input
              type={confirmPasswordType}
              name="confirmPassword"
              placeholder="Confirm Password"
              className={styles.confirmPassword}
              onChange={handleChange}
            />
            <span className={styles.eye}>
              <Eye
                inputType={confirmPasswordType}
                toggleEye={handleConfirmPassword}
              />
            </span>
          </div>
        </div>
        <button className={styles.register}>Register</button>
        <p>Have an account?</p>
        <button className={styles.login} onClick={() => navigate("/")}>
          Login
        </button>
      </form>
    </main>
  );
};

export default Register;
