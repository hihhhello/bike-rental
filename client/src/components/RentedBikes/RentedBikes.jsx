import React, { useEffect, useState } from "react";
import Block from "../Block";
import BikeItem from "../BikeItem";
import { useSelector } from "react-redux";
import { useActions } from "../../hooks/useActions";
import getTotalRent from "../../services/getTotalRent";
import Placeholder from "../Placeholder";

export const RentedBikes = () => {
  const [totalRent, setTotalRent] = useState(0);
  const { rentedBikes, error, loading } = useSelector(
    ({ rentedBikes }) => rentedBikes
  );
  const { newRent } = useSelector(({ bike }) => bike);
  const { fetchRentedBikes, addRentToList, removeBikeFromList } = useActions();
  useEffect(() => {
    if (newRent) {
      addRentToList(newRent);
      removeBikeFromList(newRent["bike_id"]);
    }
  }, [newRent]);
  useEffect(() => {
    fetchRentedBikes();
  }, []);
  useEffect(() => {
    setTotalRent(getTotalRent(rentedBikes));
  }, [rentedBikes]);
  const title = {
    emoji: "🤩",
    text: `Your rent (Total: $${
      rentedBikes.length ? totalRent.toFixed(2) : "--.--"
    })`,
  };
  return (
    <Block titleData={title} loading={loading}>
      {error ? (
        <Placeholder text={error} error />
      ) : !rentedBikes.length ? (
        <Placeholder text={"No rented bikes :("} />
      ) : (
        rentedBikes.map(({ id, ...rentData }) => (
          <BikeItem key={id} id={id} {...rentData} />
        ))
      )}
    </Block>
  );
};
