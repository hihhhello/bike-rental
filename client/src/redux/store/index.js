import { applyMiddleware, compose, createStore } from "redux";
import { rootReducer } from "./reducers";
import createSagaMiddleWare from "redux-saga";
import { rootWatcher } from "../saga";

const sagaMiddleWare = createSagaMiddleWare();

export const store = createStore(
  rootReducer,
  compose(applyMiddleware(sagaMiddleWare))
);

sagaMiddleWare.run(rootWatcher);
