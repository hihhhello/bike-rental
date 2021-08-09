import { applyMiddleware, compose, createStore } from "redux";
import { rootReducer } from "./reducers";
import createSagaMiddleWare from "redux-saga";
import { rootWatcher } from "../saga";

const sagaMiddleWare = createSagaMiddleWare();

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(sagaMiddleWare),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

sagaMiddleWare.run(rootWatcher);
