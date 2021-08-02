import { LOG_IN, LOG_OUT } from "../types";

const initialState = {
  token: "",
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN: {
      return {
        ...state,
        token: action.payload.jwt,
      };
    }
    case LOG_OUT: {
      return {
        initialState,
      };
    }
    default:
      return state;
  }
};

export default Reducer;
