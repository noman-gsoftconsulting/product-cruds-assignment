import { NOTIFICATION } from "../types";

const initialState = {
  severity: "",
  open: false,
  message: "",
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATION: {
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

export default notificationReducer;
