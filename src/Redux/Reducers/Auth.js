import { LOG_IN, AUTH_ERROR, GET_PRODUCTS, GET_PRODUCT_DETAIL } from "../Types";

const initialState = {
  token: "",
  errorMessage: "",
  products: "",
  productDetail: "",

};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN: {
      //   console.log(action.payload.jwt);
      //   console.log(initialState.token);
      return {
        ...state,
        token: action.payload.jwt,
      };
    }
    case AUTH_ERROR: {
      return {
        ...state,
        errorMessage: "Username or Password is incorrect",
      };
    }
    case GET_PRODUCTS: {
    //   console.log(action.payload);
      return {
        ...state,
        products: action.payload,
      };
    }
    case GET_PRODUCT_DETAIL: {
        // console.log(action.payload);
        return {
          ...state,
          productDetail: action.payload,
        };
      }
    default:
      return state;
  }
};

export default Reducer;
