import { SUCCESS_NOTIFICATION } from "../Types";

const initialState = {
  severity: "",
  open: false,
  message: "",
};

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUCCESS_NOTIFICATION: {
      return {
        ...state,
        severity: action.payload.severity,
        open: action.payload.open,
        message: action.payload.message,
      };
    }
    default:
      return state;
  }
};

export default ProductReducer;
