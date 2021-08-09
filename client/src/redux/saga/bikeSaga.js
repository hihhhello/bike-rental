import { put, takeEvery, call } from "redux-saga/effects";
import { fetchData } from "../../services/fetchData";
import {
  DELETE_BIKE,
  DELETE_BIKE_ERROR,
  DELETE_BIKE_SUCCESS,
  DELETE_RENT,
  DELETE_RENT_SUCCESS,
  DELETE_RENT_ERROR,
} from "../types/bike";
import { RENT_BIKE, RENT_BIKE_ERROR, RENT_BIKE_SUCCESS } from "../types/bike";
import {
  REMOVE_BIKE_AVAILABLE_BIKES,
  ADD_BIKE_AVAILABLE_BIKES,
} from "../types/availableBikes";
import { REMOVE_RENT_RENTED_BIKES } from "../types/rentedBikes";

const rentBike = async (rentBikeData) => {
  return await fetchData({
    url: "./api/rented-bike",
    method: "POST",
    body: {
      ...rentBikeData,
    },
  });
};

function* rentBikeWorker({ payload }) {
  try {
    const { newRent } = yield call(rentBike, payload);
    yield put({
      type: RENT_BIKE_SUCCESS,
      payload: newRent,
    });
  } catch (e) {
    yield put({
      type: RENT_BIKE_ERROR,
      payload: "Something gone wrong while renting bike...",
    });
  }
}

const deleteBike = async (bikeID) => {
  return await fetchData({
    url: "./api/bike",
    method: "DELETE",
    body: {
      bikeID,
    },
  });
};

function* deleteBikeWorker({ payload }) {
  try {
    yield call(deleteBike, payload);
    yield put({
      type: DELETE_BIKE_SUCCESS,
      payload,
    });
    yield put({
      type: REMOVE_BIKE_AVAILABLE_BIKES,
      payload,
    });
  } catch (e) {
    yield put({
      type: DELETE_BIKE_ERROR,
      payload: {
        error: "Something gone wrong while deleting bike...",
        bikeID: payload,
      },
    });
  }
}

const deleteRent = async (rentID) => {
  return await fetchData({
    url: "./api/rented-bike",
    method: "DELETE",
    body: {
      rentID,
    },
  });
};

function* deleteRentWorker({ payload: { rentID, bikeData } }) {
  try {
    yield call(deleteRent, rentID);
    yield put({
      type: DELETE_RENT_SUCCESS,
      rentID,
    });
    yield put({
      type: REMOVE_RENT_RENTED_BIKES,
      payload: rentID,
    });
    yield put({
      type: ADD_BIKE_AVAILABLE_BIKES,
      payload: bikeData,
    });
  } catch (e) {
    yield put({
      type: DELETE_RENT_ERROR,
      payload: {
        error: "Something gone wrong while deleting rent...",
        rentID,
      },
    });
  }
}

export function* bikeWatcher() {
  yield takeEvery(RENT_BIKE, rentBikeWorker);
  yield takeEvery(DELETE_BIKE, deleteBikeWorker);
  yield takeEvery(DELETE_RENT, deleteRentWorker);
}
