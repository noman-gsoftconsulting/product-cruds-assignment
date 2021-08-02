import { combineReducers } from "redux";
import Reducer from "./auth";
import ProductReducer from "./productReducer";
import messageReducer from "./messageReducer";

const rootReducer = combineReducers({
  auth: Reducer,
  product: ProductReducer,
  message: messageReducer,
});

export default rootReducer;


//This is for change folder names.
