import React from "react";
import styles from "./BlockTitle.module.scss";

export const BlockTitle = ({ emoji, text }) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.emoji}>{emoji}</span>
      <h2 className={styles.text}>{text}</h2>
    </div>
  );
};
