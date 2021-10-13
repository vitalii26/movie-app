import React from "react";
import styles from "./ErrorIndicator.module.css";
import icon from "../../assets/main-logo.png";

const ErrorIndicator = () => {
  return (
    <div className={styles.errorIndicator}>
      <img src={icon} alt="error icon" />
      <span className={styles.boom}>BOOM!</span>
      <span>Something has gone terribly wrong</span>
      <span>(but we are fixing it)</span>
    </div>
  );
};

export default ErrorIndicator;
