import * as AvailableBikesActionCreators from "./availableBikes";
import * as BikeTypesActionCreators from "./bikeTypes";
import * as RentedBikesActionCreators from "./rentedBikes";
import * as CreateRentActionCreators from "./createRent";
import * as BikeActionCreators from "./bike";

export default {
  ...AvailableBikesActionCreators,
  ...BikeTypesActionCreators,
  ...RentedBikesActionCreators,
  ...CreateRentActionCreators,
  ...BikeActionCreators,
};
