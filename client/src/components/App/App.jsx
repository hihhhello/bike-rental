import React from "react";
import AvailableBikes from "../AvailableBikes";
import CreateRent from "../CreateRent";
import RentedBikes from "../RentedBikes";
import styles from "./App.module.scss";
import { ToastContainer } from "react-toastify";

export const App = () => {
  return (
    <>
      <ToastContainer />

      <div className={styles.App}>
        <div className="container">
          <h1>Awesome Bike Rental</h1>
          <CreateRent />
          <RentedBikes />
          <AvailableBikes />
        </div>
      </div>
    </>
  );
};
