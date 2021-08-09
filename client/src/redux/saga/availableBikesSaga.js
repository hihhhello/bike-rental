import { put, takeEvery, call } from "redux-saga/effects";
import { fetchData } from "../../services/fetchData";
import {
  FETCH_AVAILABLE_BIKES,
  FETCH_AVAILABLE_BIKES_ERROR,
  FETCH_AVAILABLE_BIKES_SUCCESS,
} from "../types/availableBikes";

const fetchAvailableBikes = async () => {
  return await fetchData({ url: "./api/bike" });
};

function* fetchAvailableBikesWorker() {
  try {
    const { bikes } = yield call(fetchAvailableBikes);
    yield put({
      type: FETCH_AVAILABLE_BIKES_SUCCESS,
      payload: bikes,
    });
  } catch (e) {
    yield put({
      type: FETCH_AVAILABLE_BIKES_ERROR,
      payload: "Something gone wrong while fetching bikes...",
    });
  }
}

export function* fetchAvailableBikesWatcher() {
  yield takeEvery(FETCH_AVAILABLE_BIKES, fetchAvailableBikesWorker);
}
