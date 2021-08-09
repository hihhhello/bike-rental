import { put, takeEvery, call } from "redux-saga/effects";
import { fetchData } from "../../services/fetchData";
import {
  FETCH_RENTED_BIKES,
  FETCH_RENTED_BIKES_ERROR,
  FETCH_RENTED_BIKES_SUCCESS,
} from "../types/rentedBikes";

const fetchRentedBikes = async () => {
  return await fetchData({ url: "./api/rented-bike" });
};

function* fetchRentedBikesWorker() {
  try {
    const { rentedBikes } = yield call(fetchRentedBikes);
    yield put({
      type: FETCH_RENTED_BIKES_SUCCESS,
      payload: rentedBikes,
    });
  } catch (e) {
    yield put({
      type: FETCH_RENTED_BIKES_ERROR,
      payload: "Something gone wrong while fetching rent...",
    });
  }
}

export function* fetchRentedBikesWatcher() {
  yield takeEvery(FETCH_RENTED_BIKES, fetchRentedBikesWorker);
}
