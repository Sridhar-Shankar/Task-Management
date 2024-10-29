import React from "react";
import styles from "./Logout.module.css";

const Logout = ({ setdelete }) => {
  const handleLogout = () => {
    setdelete(false);
    console.log("Logged Out");
  };

  return (
    <div className={styles.modal}>
      <h2>Are you sure you want to logout?</h2>
      <button onClick={handleLogout}>Yes</button>
      <button onClick={() => setdelete(false)}>No</button>
    </div>
  );
};

export default Logout;
