import { createStore, applyMiddleware } from "redux";
import index from "../reducers/index";
import thunk from "redux-thunk";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["auth", "isAuthenticated"],
};

const persistedReducer = persistReducer(persistConfig, index);
export const store = createStore(persistedReducer, applyMiddleware(thunk));