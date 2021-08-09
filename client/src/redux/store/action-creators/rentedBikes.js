import {
  FETCH_RENTED_BIKES,
  ADD_RENT_RENTED_BIKES,
} from "../../types/rentedBikes";

export const fetchRentedBikes = () => {
  return {
    type: FETCH_RENTED_BIKES,
  };
};

export const addRentToList = (newRent) => {
  return {
    type: ADD_RENT_RENTED_BIKES,
    payload: newRent,
  };
};
