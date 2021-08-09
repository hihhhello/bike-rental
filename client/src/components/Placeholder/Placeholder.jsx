import React from "react";
import styles from "./Placeholder.module.scss";

export const Placeholder = ({ text, error }) => (
  <h3
    className={
      error ? [styles.wrapper, styles.error].join(" ") : styles.wrapper
    }
  >
    {text}
  </h3>
);
