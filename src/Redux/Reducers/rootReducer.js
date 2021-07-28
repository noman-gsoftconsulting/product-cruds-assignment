import { combineReducers } from "redux";
import Reducer from "../Reducers/Auth";
import ProductReducer from "../Reducers/productReducer";
import messageReducer from "../Reducers/messageReducer";

const rootReducer = combineReducers({
  auth: Reducer,
  product: ProductReducer,
  message: messageReducer,
});

export default rootReducer;
