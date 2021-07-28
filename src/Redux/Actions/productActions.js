import {
  GET_PRODUCTS,
  GET_PRODUCT_DETAIL,
  DELETE_PRODUCT,
  UPDATE_PRODUCT
} from "../Types";
import API from "../../Utils/API";

export const getProducts = () => async (dispatch, getState) => {
  const token = getState().auth.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
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
  const token = getState().auth.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
//   console.log(token);
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

export const deleteProduct = (id) => async (dispatch, getState) => {
  const token = getState().auth.token;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // console.log(token);
//   console.log(id);
  try {
    const response = await API.delete(`/products/${id}`, config);
    // console.log(response)
    dispatch({ type: DELETE_PRODUCT, payload: response.data });
    return { status: response.status, data: response.data };
  } catch (error) {
    return console.log(error);
  }
};

export const addProduct =
  ({ title, description, price, coverPhoto }) =>
  async (dispatch, getState) => {
    const token = getState().auth.token;
    const body = JSON.stringify({
      title,
      description,
      price,
      coverPhoto,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    // console.log(token);
    // console.log(id);
    try {
      const response = await API.post(`/products/`, body, config);
      return { status: response.status, data: response.data };
    } catch (error) {
      return console.log(error);
    }
  };

export const updateProduct =
  ({ title, description, price, coverPhoto, id }) =>
  async (dispatch, getState) => {
    const token = getState().auth.token;
    const body = JSON.stringify({
      title,
      description,
      price,
      coverPhoto,
      id,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(token);
    console.log(id);
    try {
      const response = await API.put(`/products/${id}`, body, config);
      console.log(response);
      dispatch({ type: UPDATE_PRODUCT, payload: response.status });
      return { status: response.status, data: response.data };
    } catch (error) {
      return console.log(error);
    }
  };
