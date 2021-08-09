import { put, takeEvery, call } from "redux-saga/effects";
import { fetchData } from "../../services/fetchData";
import {
  FETCH_BIKE_TYPES,
  FETCH_BIKE_TYPES_ERROR,
  FETCH_BIKE_TYPES_SUCCESS,
} from "../types/bikeTypes";

const fetchAvailableBikeTypes = async () => {
  return await fetchData({ url: "./api/bike-type" });
};

function* fetchBikeTypesWorker() {
  try {
    const { bikeTypes } = yield call(fetchAvailableBikeTypes);
    yield put({
      type: FETCH_BIKE_TYPES_SUCCESS,
      payload: bikeTypes,
    });
  } catch (e) {
    yield put({
      type: FETCH_BIKE_TYPES_ERROR,
      payload: "Something gone wrong while fetching bike types...",
    });
  }
}

export function* fetchBikeTypesWatcher() {
  yield takeEvery(FETCH_BIKE_TYPES, fetchBikeTypesWorker);
}
