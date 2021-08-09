import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useActions } from "../../hooks/useActions";
import BlockTitle from "../BlockTitle";
import Button from "../Button";
import Placeholder from "../Placeholder";
import Loader from "../Loader";
import styles from "./CreateRent.module.scss";
import { toast } from "react-toastify";

export const CreateRent = () => {
  const { bikeTypes, loading, error } = useSelector(
    ({ bikeTypes }) => bikeTypes
  );
  const {
    loading: createLoading,
    error: createError,
    newBike,
  } = useSelector(({ createRent }) => createRent);
  const [name, setName] = useState("");
  const [type, setType] = useState(1);
  const [price, setPrice] = useState("");
  const { fetchBikeTypes, createRent } = useActions();

  useEffect(() => {
    if (newBike) {
      toast.success("New rent was created!", {
        toastId: "",
      });
    }
  }, [newBike]);

  useEffect(() => {
    fetchBikeTypes();
  }, []);

  const onChangeHanlder = (e) => {
    const target = e.target;
    switch (target.name) {
      case "bike-name": {
        setName(target.value);
        break;
      }
      case "bike-type": {
        setType(target.value);
        break;
      }
      case "bike-price": {
        setPrice(target.value);
        break;
      }
      default: {
        break;
      }
    }
  };

  const createRentHandler = (e) => {
    e.preventDefault();
    if (!name) {
      toast.warning("Name field is empty!", {
        toastId: "empty-name",
      });
    }
    if (!price) {
      toast.warning("Price field is empty!", {
        toastId: "empty-price",
      });
    }
    if (isNaN(+price)) {
      toast.warning("Price must be a number!", {
        toastId: "not-a-number",
      });
      return;
    }
    if (name && type && price) {
      createRent(name, type, price);
      setName("");
      setPrice("");
    }
    return;
  };

  if (createError) {
    toast.error(createError, {
      toastId: "create-rent-id",
    });
  }

  return (
    <>
      <BlockTitle emoji={"🤑"} text={"Create new rent"} />
      {loading ? (
        <Loader />
      ) : error ? (
        <Placeholder text={error} error />
      ) : (
        <div className={styles.wrapper}>
          {createLoading && (
            <div className={styles.loader}>
              <Loader />
            </div>
          )}
          <form
            className={
              createLoading
                ? [styles.form, styles.loading].join(" ")
                : styles.form
            }
            onSubmit={createRentHandler}
          >
            <div className={styles.input}>
              <label htmlFor={"bike-name"}>Bike name</label>
              <input
                value={name}
                name={"bike-name"}
                id={"bike-name"}
                type={"text"}
                onChange={onChangeHanlder}
                placeholder={"name"}
              />
            </div>
            <div className={styles.input}>
              <label htmlFor="">Bike type</label>
              <select
                id={"bike-type"}
                name={"bike-type"}
                onChange={onChangeHanlder}
              >
                {bikeTypes.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div className={[styles.input, styles.input_price].join(" ")}>
              <label htmlFor={"bike-price"}>Rent price</label>
              <input
                value={price}
                onChange={onChangeHanlder}
                id={"bike-price"}
                name={"bike-price"}
                type="text"
                placeholder={"00.00"}
              />
            </div>
            <Button type={0} onClick={createRentHandler} />
          </form>
        </div>
      )}
    </>
  );
};
