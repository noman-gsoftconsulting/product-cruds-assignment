import React from "react";
import { Redirect, Route } from "react-router-dom";
import {useSelector} from "react-redux"

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const token = useSelector((state) => state.auth.token);
  const isAuthenticated = localStorage.getItem("isAuthenticated");


  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated && token ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

export default ProtectedRoute;