import {
  ADD_BIKE_AVAILABLE_BIKES,
  FETCH_AVAILABLE_BIKES,
  REMOVE_BIKE_AVAILABLE_BIKES,
} from "../../types/availableBikes";

export const fetchAvailableBikes = () => {
  return {
    type: FETCH_AVAILABLE_BIKES,
  };
};

export const addBikeToList = (newBike) => {
  return {
    type: ADD_BIKE_AVAILABLE_BIKES,
    payload: newBike,
  };
};

export const removeBikeFromList = (bikeID) => {
  return {
    type: REMOVE_BIKE_AVAILABLE_BIKES,
    payload: bikeID,
  };
};
