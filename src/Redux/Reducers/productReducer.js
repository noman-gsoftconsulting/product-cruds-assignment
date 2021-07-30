import {
  GET_PRODUCTS,
  GET_PRODUCT_DETAIL,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from "../types";

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
      return {
        ...state,
        products: action.payload,
      };
    }
    case GET_PRODUCT_DETAIL: {
      return {
        ...state,
        productDetail: action.payload,
      };
    }
    case ADD_PRODUCT: {
      // console.log(action.payload);
      return {
        ...state.products,
        products: state.products.concat(action.payload),
      };
    }
    case DELETE_PRODUCT: {
      // console.log(action.payload);
      return {
        ...state.products,
        products: state.products.filter(
          (product) => product.id !== action.payload.id
        ),
      };
    }
    case UPDATE_PRODUCT: {
      // console.log(action.payload);
      return {
        ...state.products,
        products: state.products,
      };
    }
    default:
      return state;
  }
};

export default ProductReducer;
