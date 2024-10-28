// Eye.js
import React from "react";
import styles from "./Eye.module.css"; 
import eyeOpen from "../../assets/eye.png"; 
import eyeClosed from "../../assets/eyeOff.png"; 

const Eye = ({ inputType, toggleEye }) => {
  return (
    <span className={styles.eye} onClick={toggleEye}>
      <img
        src={inputType === "password" ? eyeClosed : eyeOpen}
        alt="Toggle password visibility"
        className={styles.eyeIcon}
      />
    </span>
  );
};

export default Eye;
