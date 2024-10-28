import React from "react";
import { Link } from "react-router-dom";
import styles from "./RequireAuth.module.css"; // Import your CSS module

const RequireAuth = ({ children }) => {
  const isAuthenticated = localStorage.getItem("userEmail");

  if (!isAuthenticated) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Access Denied</h1>
          <p className={styles.message}>
            You need to log in to access this page. Please log in to continue.
          </p>
          <Link to="/login" className={styles.link}>
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return children;
};

export default RequireAuth;
