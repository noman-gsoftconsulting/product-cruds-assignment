import {
    GET_PRODUCTS,
    GET_PRODUCT_DETAIL,
  } from "../Types";

  const initialState = {
    products: "",
    productDetail: "",
    severity: "",
    open: false,
    message: "",
    show: true,
  };

  const ProductReducer = (state = initialState, action) => {
    switch (action.type) {
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
  
  export default ProductReducer;