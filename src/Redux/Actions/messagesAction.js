import { SUCCESS_NOTIFICATION } from "../Types";

export const alertNotification =
  ({ message, open, severity }) =>
  (dispatch) => {
    const data = {
      message: message,
      open: open,
      severity: severity,
    };
    dispatch({
      type: SUCCESS_NOTIFICATION,
      payload: data,
    });
  };
