import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Reducer from "../Reducers/Auth";
import { persistReducer,  } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};



const persistedReducer = persistReducer(persistConfig, Reducer);
export const store = createStore(persistedReducer, applyMiddleware(thunk));

