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
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear errors on change
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        "http://localhost:8000/auth/login",
        formData
      );
      localStorage.setItem("userEmail", JSON.stringify(response.data));
      toast.success(response.data.message);
      setTimeout(() => navigate("/home"), 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
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
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
          <div className={styles.inputPwdGroup}>
            <input
              type={inputType}
              name="password"
              placeholder="Password"
              className={styles.password}
              value={formData.password}
              onChange={handleChange}
            />
            <span className={styles.eye}>
              <Eye
                inputType={inputType}
                toggleEye={() =>
                  setInputType(inputType === "password" ? "text" : "password")
                }
              />
            </span>
          </div>
          {errors.password && (
            <span className={styles.error}>{errors.password}</span>
          )}
        </div>
        <button className={styles.login} type="submit">
          Log in
        </button>
        <p>No account?</p>
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
