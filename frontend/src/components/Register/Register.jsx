import React, { useState } from "react";
import styles from "./Register.module.css";
import Banner from "../../UI/Banner";
import { useNavigate } from "react-router-dom";
import Eye from "../../UI/Eye/Eye";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

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

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Reset error messages on input change
    setErrors({ ...errors, [name]: "" });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let isValid = true;

    // Email validation
    if (!formData.email) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email format" }));
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
      isValid = false;
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: "Passwords do not match" }));
      isValid = false;
    }

    if (!isValid) return;

    try {
      const response = await axios.post(
        "http://localhost:8000/auth/register",
        formData
      );
      toast.success("Registration successful!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <main>
      <Toaster />
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
          {errors.email && <p className={styles.error}>{errors.email}</p>} {/* Changed to <p> */}
          <div className={styles.inputPwdGroup}>
            <input
              type={passwordType}
              name="password"
              placeholder="Password"
              className={styles.password}
              onChange={handleChange}
            />
            {errors.password && <p className={styles.error}>{errors.password}</p>} {/* Changed to <p> */}
            <span className={styles.eye}>
              <Eye inputType={passwordType} toggleEye={() => setPasswordType(passwordType === "password" ? "text" : "password")} />
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
            {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword}</p>} {/* Changed to <p> */}
            <span className={styles.eye}>
              <Eye inputType={confirmPasswordType} toggleEye={() => setConfirmPasswordType(confirmPasswordType === "password" ? "text" : "password")} />
            </span>
          </div>
        </div>
        <button className={styles.register} type="submit">Register</button>
        <p>Already have an account?</p>
        <button className={styles.login} onClick={() => navigate("/login")}>Login</button>
      </form>
    </main>
  );
};

export default Register;
