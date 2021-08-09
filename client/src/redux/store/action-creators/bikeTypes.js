import { FETCH_BIKE_TYPES } from "../../types/bikeTypes";

export const fetchBikeTypes = () => {
  return {
    type: FETCH_BIKE_TYPES,
  };
};
