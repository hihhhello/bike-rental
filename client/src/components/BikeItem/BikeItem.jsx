import React, { useState } from "react";
import styles from "./BikeItem.module.scss";
import Button from "../Button";
import Loader from "../Loader";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useActions } from "../../hooks/useActions";

export const BikeItem = ({
  id,
  bike_id, // for rent items
  name,
  type,
  price,
  rent_time: rentTime = null,
  isAval = false,
}) => {
  const {
    rentBikeInput,
    bikeID,
    loading,
    error,
    bikeToDeleteStack,
    rentToDeleteStack,
  } = useSelector(({ bike }) => bike);
  console.log(rentToDeleteStack);
  const { toggleRentBikeInput, rentBike, deleteBike, deleteRent } =
    useActions();
  const [createRentRentTime, setCreateRentRentTime] = useState(1);
  const onToggleRentTimeInputHandler = (e, id) => {
    e.preventDefault();
    toggleRentBikeInput(id);
  };
  const onChangeRentTimeInputHandler = (e) => {
    setCreateRentRentTime(e.target.value);
  };
  const onRentBike = (e) => {
    e.preventDefault();
    rentBike(id, createRentRentTime, price);
    setCreateRentRentTime(1);
    onToggleRentTimeInputHandler(e, bikeID);
  };
  const onDeleteBike = (e) => {
    e.preventDefault();
    deleteBike(id);
  };
  const onDeleteRent = (e) => {
    e.preventDefault();
    deleteRent({ rentID: id, bikeData: { id: bike_id, name, type, price } });
  };
  if (error) {
    toast.error(error, {
      toastId: "rent-bike-error",
    });
  }
  return (
    <div
      className={
        rentBikeInput && bikeID === id
          ? [styles.wrapper, styles.active].join(" ")
          : styles.wrapper
      }
    >
      {loading &&
        (bikeID === id ||
          bikeToDeleteStack.includes(id) ||
          rentToDeleteStack.includes(id)) && (
          <div className={styles.loader}>
            <Loader />
          </div>
        )}
      {rentBikeInput && bikeID === id ? (
        <div className={styles["input-wrapper"]}>
          <div className={styles.input}>
            <label htmlFor="rent-time">Rent time</label>
            <input
              onChange={onChangeRentTimeInputHandler}
              value={createRentRentTime}
              min={1}
              max={100}
              placeholder="0h"
              type="number"
              name="rent-time"
              id="rent-time"
            />
          </div>
          <div className={styles["input-btns"]}>
            <div>
              <Button type={2} onClick={onRentBike} />
            </div>
            <div>
              <Button
                type={4}
                onClick={(e) => onToggleRentTimeInputHandler(e, bikeID)}
              />
            </div>
          </div>
        </div>
      ) : null}
      <div
        className={
          (rentBikeInput && bikeID) ||
          (loading &&
            (bikeID === id ||
              bikeToDeleteStack.includes(id) ||
              rentToDeleteStack.includes(id)))
            ? [styles.inner, styles.blocked].join(" ")
            : styles.inner
        }
      >
        <p className={styles.data}>
          <span>{name}</span>
          <span>/</span>
          <span>{type}</span>
          <span>/</span>
          <span>{`$${price}`}</span>
          {rentTime && (
            <>
              <span>/</span>
              <span>{`${rentTime}h`}</span>
            </>
          )}
        </p>
        <div className={styles["btn-wrapper"]}>
          {isAval ? (
            <>
              <div>
                <Button
                  type={2}
                  onClick={(e) => onToggleRentTimeInputHandler(e, id)}
                />
              </div>
              <div>
                <Button type={3} onClick={onDeleteBike} />
              </div>
            </>
          ) : (
            <Button type={1} onClick={onDeleteRent} />
          )}
        </div>
      </div>
    </div>
  );
};
