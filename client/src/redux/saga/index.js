import { all } from "redux-saga/effects";
import { fetchAvailableBikesWatcher } from "./availableBikesSaga";
import { fetchBikeTypesWatcher } from "./bikeTypesSaga";
import { fetchRentedBikesWatcher } from "./rentedBikesSaga";
import { createRentWatcher } from "./createRentSaga";
import { bikeWatcher } from "./bikeSaga";

export function* rootWatcher() {
  yield all([
    fetchAvailableBikesWatcher(),
    fetchBikeTypesWatcher(),
    fetchRentedBikesWatcher(),
    createRentWatcher(),
    bikeWatcher(),
  ]);
}
