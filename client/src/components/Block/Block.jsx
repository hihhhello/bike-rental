import React from "react";
import styles from "./Block.module.scss";
import BlockTitle from "../BlockTitle";
import Loader from "../Loader";

export const Block = ({ titleData, children, loading }) => (
  <>
    <BlockTitle {...titleData} />
    {loading ? <Loader /> : <div className={styles.wrapper}>{children}</div>}
  </>
);
