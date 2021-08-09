import React from "react";
import styles from "./Button.module.scss";
import getButtonOptions from "../../services/getButtonOptions";

export const Button = ({ type = -1, onClick = () => {} }) => {
  const options = getButtonOptions({ type, styles });
  if (!options) {
    return null;
  }

  return (
    <button onClick={onClick} className={[styles.btn, options.class].join(" ")}>
      {options.text}
    </button>
  );
};
