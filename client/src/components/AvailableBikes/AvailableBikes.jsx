import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useActions } from "../../hooks/useActions";
import Block from "../Block";
import BikeItem from "../BikeItem";
import Placeholder from "../Placeholder";

export const AvailableBikes = () => {
  const { availableBikes, loading, error } = useSelector(
    ({ availableBikes }) => availableBikes
  );
  const { fetchAvailableBikes } = useActions();

  useEffect(() => {
    fetchAvailableBikes();
  }, []);

  const title = {
    emoji: "🚲",
    text: `Available bicycles (${availableBikes.length || "-"})`,
  };
  return (
    <Block titleData={title} loading={loading}>
      {error ? (
        <Placeholder text={error} error />
      ) : !availableBikes.length ? (
        <Placeholder text={"No available bikes :("} />
      ) : (
        availableBikes.map(({ id, ...bikeData }) => (
          <BikeItem key={id} id={id} {...bikeData} isAval />
        ))
      )}
    </Block>
  );
};
