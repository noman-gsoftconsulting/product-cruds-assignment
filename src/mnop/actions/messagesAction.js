import { NOTIFICATION } from "../types";

export const alertNotification =
  ({ message, open, severity }) =>
  (dispatch) => {
    const data = {
      message: message,
      open: open,
      severity: severity,
    };
    dispatch({
      type: NOTIFICATION,
      payload: data,
    });
  };


//This is for change folder names.
