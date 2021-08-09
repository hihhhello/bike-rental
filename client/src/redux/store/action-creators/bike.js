import { DELETE_BIKE, DELETE_RENT } from "../../types/bike";
import { TOGGLE_RENT_BIKE_INPUT, RENT_BIKE } from "../../types/bike";

export const toggleRentBikeInput = (bikeID) => {
  return {
    type: TOGGLE_RENT_BIKE_INPUT,
    payload: bikeID,
  };
};

export const rentBike = (bikeID, rentTime, price) => {
  return {
    type: RENT_BIKE,
    payload: { bikeID, rentTime, price },
  };
};

export const deleteBike = (bikeID) => {
  return {
    type: DELETE_BIKE,
    payload: bikeID,
  };
};

export const deleteRent = ({ rentID, bikeData }) => {
  return {
    type: DELETE_RENT,
    payload: { rentID, bikeData },
  };
};
