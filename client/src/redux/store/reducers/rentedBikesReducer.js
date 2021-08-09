import {
  FETCH_RENTED_BIKES,
  FETCH_RENTED_BIKES_SUCCESS,
  FETCH_RENTED_BIKES_ERROR,
  ADD_RENT_RENTED_BIKES,
  REMOVE_RENT_RENTED_BIKES,
} from "../../types/rentedBikes";

import { deleteItemFromArray } from "../../../services/deleteItemFromArray";

const initialState = {
  rentedBikes: [],
  loading: false,
  error: null,
};

export const rentedBikesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RENTED_BIKES: {
      return { ...state, loading: true };
    }
    case FETCH_RENTED_BIKES_SUCCESS: {
      return { ...state, loading: false, rentedBikes: action.payload };
    }
    case FETCH_RENTED_BIKES_ERROR: {
      return { ...state, loading: false, error: action.payload };
    }
    case ADD_RENT_RENTED_BIKES: {
      return { ...state, rentedBikes: [action.payload, ...state.rentedBikes] };
    }
    case REMOVE_RENT_RENTED_BIKES: {
      const newRents = deleteItemFromArray(state.rentedBikes, action.payload);
      return { ...state, rentedBikes: newRents };
    }
    default: {
      return state;
    }
  }
};
