import React from "react";
import styles from "./Banner.module.css";
import astroImg from "../assets/AstroImage.png";

function Banner() {
  return (
    <div className={styles.banner}>
      <div className={styles.circle}>
        <img src={astroImg} alt="astroImage" className={styles.astro} />
      </div>
      <div className={styles.bannerDescription}>
        <h1 className={styles.bannerDesc}>
          Welcome aboard my friend{" "}
          <span className={styles.bannerDescSub}>
            just a couple of clicks and we start
          </span>
        </h1>
      </div>
    </div>
  );
}

export default Banner;
