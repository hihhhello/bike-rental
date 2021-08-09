import {
  TOGGLE_RENT_BIKE_INPUT,
  RENT_BIKE,
  RENT_BIKE_SUCCESS,
  RENT_BIKE_ERROR,
  DELETE_BIKE,
  DELETE_BIKE_ERROR,
  DELETE_BIKE_SUCCESS,
  DELETE_RENT,
  DELETE_RENT_SUCCESS,
  DELETE_RENT_ERROR,
} from "../../types/bike";

import { deleteItemFromArray } from "../../../services/deleteItemFromArray";

const initialState = {
  rentBikeInput: false,
  bikeID: null,
  bikeToDeleteStack: [],
  rentToDeleteStack: [],
  newRent: null,
  loading: false,
  error: null,
};

export const bikeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_RENT_BIKE_INPUT: {
      return {
        ...state,
        rentBikeInput: !state.rentBikeInput,
        bikeID: action.payload,
        error: null,
      };
    }
    case RENT_BIKE: {
      return { ...state, loading: true, error: null, newRent: null };
    }
    case RENT_BIKE_SUCCESS: {
      return { ...state, loading: false, newRent: action.payload };
    }
    case RENT_BIKE_ERROR: {
      return { ...state, loading: false, error: action.payload };
    }
    case DELETE_BIKE: {
      return {
        ...state,
        loading: true,
        error: null,
        bikeToDeleteStack: [action.payload, ...state.bikeToDeleteStack],
      };
    }
    case DELETE_BIKE_SUCCESS: {
      const newStack = deleteItemFromArray(
        state.bikeToDeleteStack,
        action.payload
      );
      return { ...state, loading: false, bikeToDeleteStack: newStack };
    }
    case DELETE_BIKE_ERROR: {
      const newStack = deleteItemFromArray(
        state.bikeToDeleteStack,
        action.payload.bikeID
      );

      return {
        ...state,
        loading: false,
        error: action.payload.error,
        bikeToDeleteStack: newStack,
      };
    }
    case DELETE_RENT: {
      return {
        ...state,
        loading: true,
        error: null,
        rentToDeleteStack: [action.payload.rentID, ...state.rentToDeleteStack],
      };
    }
    case DELETE_RENT_SUCCESS: {
      const newStack = deleteItemFromArray(
        state.rentToDeleteStack,
        action.payload
      );
      return { ...state, loading: false, rentToDeleteStack: newStack };
    }
    case DELETE_RENT_ERROR: {
      const newStack = deleteItemFromArray(
        state.rentToDeleteStack,
        action.payload.rentID
      );

      return {
        ...state,
        loading: false,
        error: action.payload.error,
        rentToDeleteStack: newStack,
      };
    }
    default: {
      return state;
    }
  }
};
