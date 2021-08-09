import {
  FETCH_BIKE_TYPES,
  FETCH_BIKE_TYPES_SUCCESS,
  FETCH_BIKE_TYPES_ERROR,
} from "../../types/bikeTypes";
const initialState = {
  bikeTypes: [],
  loading: false,
  error: null,
};

export const bikeTypesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BIKE_TYPES: {
      return { ...state, loading: true, error: null };
    }
    case FETCH_BIKE_TYPES_SUCCESS: {
      return { ...state, loading: false, bikeTypes: action.payload };
    }
    case FETCH_BIKE_TYPES_ERROR: {
      return { ...state, loading: false, error: action.payload };
    }
    default: {
      return state;
    }
  }
};
