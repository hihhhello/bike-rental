import {
  FETCH_AVAILABLE_BIKES,
  FETCH_AVAILABLE_BIKES_SUCCESS,
  FETCH_AVAILABLE_BIKES_ERROR,
  ADD_BIKE_AVAILABLE_BIKES,
  REMOVE_BIKE_AVAILABLE_BIKES,
} from "../../types/availableBikes";
import { deleteItemFromArray } from "../../../services/deleteItemFromArray";
const initialState = {
  availableBikes: [],
  loading: false,
  error: null,
};

export const availableBikesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_AVAILABLE_BIKES: {
      return { ...state, loading: true };
    }
    case FETCH_AVAILABLE_BIKES_SUCCESS: {
      return {
        ...state,
        loading: false,
        availableBikes: action.payload,
      };
    }
    case FETCH_AVAILABLE_BIKES_ERROR: {
      return { ...state, loading: false, error: action.payload };
    }
    case ADD_BIKE_AVAILABLE_BIKES: {
      return {
        ...state,
        availableBikes: [action.payload, ...state.availableBikes].sort(
          (a, b) => b.id - a.id
        ),
      };
    }
    case REMOVE_BIKE_AVAILABLE_BIKES: {
      const newBikesList = deleteItemFromArray(
        state.availableBikes,
        action.payload
      );
      return {
        ...state,
        availableBikes: newBikesList,
      };
    }
    default: {
      return state;
    }
  }
};
