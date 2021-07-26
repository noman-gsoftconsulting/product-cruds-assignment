import { LOG_IN, AUTH_ERROR, GET_PRODUCTS, GET_PRODUCT_DETAIL, DELETE_PRODUCT } from "../Types";
import API from "../../Utils/API";

export const logIn =
  ({ identifier, password }) =>
  async (dispatch) => {
    const body = JSON.stringify({
      identifier,
      password,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    try {
      const response = await API.post(`/auth/local`, body, config);
      dispatch({ type: LOG_IN, payload: response.data });
      // console.log(response.data.jwt);
      console.log("Signed In Successfully");
      return { status: response.status, data: response.data };
    } catch (error) {
      dispatch({ type: AUTH_ERROR });
    }
  };

export const getProducts = () => async (dispatch, getState) => {
  const token = getState().token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  //   console.log(token);
  try {
    const response = await API.get("/products", config);
    // console.log(response)
    dispatch({ type: GET_PRODUCTS, payload: response.data });
    return { status: response.status, data: response.data };
  } catch (error) {
    return console.log(error);
  }
};

export const getProductDetail = (id) => async (dispatch, getState) => {
  const token = getState().token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log(token);
  // console.log(id);
  try {
    const response = await API.get(`/products/${id}`, config);
    // console.log(response)
    dispatch({ type: GET_PRODUCT_DETAIL, payload: response.data });
    return { status: response.status, data: response.data };
  } catch (error) {
    return console.log(error);
  }
};

export const deleteProduct = (id) => async (dispatch,getState) => {
    const token = getState().token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    // console.log(token);
    console.log(id);
    try {
      const response = await API.delete(`/products/${id}`, config);
      // console.log(response)
      dispatch({ type: DELETE_PRODUCT, payload: response.data });
      return { status: response.status, data: response.data };
    } catch (error) {
      return console.log(error);
    }
  };
