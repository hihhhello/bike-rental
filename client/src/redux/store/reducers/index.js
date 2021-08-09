import { combineReducers } from "redux";
import { availableBikesReducer } from "./availableBikesReducer";
import { bikeTypesReducer } from "./bikeTypesReducer";
import { rentedBikesReducer } from "./rentedBikesReducer";
import { createRentReducer } from "./createRentReducer";
import { bikeReducer } from "./bikeReducer";

export const rootReducer = combineReducers({
  availableBikes: availableBikesReducer,
  bikeTypes: bikeTypesReducer,
  rentedBikes: rentedBikesReducer,
  createRent: createRentReducer,
  bike: bikeReducer,
});
