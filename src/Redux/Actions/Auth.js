import {
  LOG_IN,
  LOG_OUT
} from "../types";
import API from "../../utils/API";

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
      // console.log("Signed In Successfully");
      return { status: response.status, data: response.data };
    } catch (error) {
      console.log(error)
    }
  };

export const logOut = () => async (dispatch) => {
  dispatch({ type: LOG_OUT });
};
