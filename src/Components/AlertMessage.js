import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { alertNotification } from "../redux/actions/messagesAction";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function AlertMessage() {
  const state = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    let duration = setTimeout(() => {
      dispatch(alertNotification({ message: "", open: false, severity: "" }));
    }, 1000);
    return () => {
      clearTimeout(duration);
    };
  }, [state]);

  return (
    <div>
      <Snackbar
        open={state.open}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert severity={state.severity}>{state.message}</Alert>
      </Snackbar>
    </div>
  );
}

export default AlertMessage;
