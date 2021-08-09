import {
  CREATE_RENT,
  CREATE_RENT_SUCCESS,
  CREATE_RENT_ERROR,
} from "../../types/createRent";
const initialState = {
  newBike: null,
  loading: false,
  error: null,
};

export const createRentReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_RENT: {
      return { ...state, loading: true, error: null, newBike: null };
    }
    case CREATE_RENT_SUCCESS: {
      return { ...state, loading: false, newBike: action.payload };
    }
    case CREATE_RENT_ERROR: {
      return { ...state, loading: false, error: action.payload };
    }
    default: {
      return state;
    }
  }
};
