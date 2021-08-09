import { put, takeEvery, call } from "redux-saga/effects";
import { fetchData } from "../../services/fetchData";
import {
  CREATE_RENT,
  CREATE_RENT_ERROR,
  CREATE_RENT_SUCCESS,
} from "../types/createRent";
import { ADD_BIKE_AVAILABLE_BIKES } from "../types/availableBikes";

const createRent = async (bikeData) => {
  return await fetchData({
    url: "./api/bike",
    method: "POST",
    body: {
      ...bikeData,
    },
  });
};

function* createRentWorker({ payload }) {
  try {
    const { newBike } = yield call(createRent, payload);
    yield put({
      type: CREATE_RENT_SUCCESS,
      payload: newBike,
    });
    yield put({
      type: ADD_BIKE_AVAILABLE_BIKES,
      payload: newBike,
    });
  } catch (e) {
    yield put({
      type: CREATE_RENT_ERROR,
      payload: "Something gone wrong while creating rent...",
    });
  }
}

export function* createRentWatcher() {
  yield takeEvery(CREATE_RENT, createRentWorker);
}
