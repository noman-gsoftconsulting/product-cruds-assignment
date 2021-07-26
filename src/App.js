import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./Utils/Routes/ProtectedRoute";
import SignIn from "./Pages/SignIn";
import ProductListing from "./Containers/ProductListing";
import ProductDetail from "./Containers/ProductDetail";
import Home from "./Pages/Home";
import AddEdit from "./Components/AddEdit"


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <SignIn />
        </Route>
        <ProtectedRoute exact path="/home" component={Home} />
        {/* <Route exact path="/signup">
          <SignUp />
        </Route> */}
        <Route exact path="/ProductListing/:id" component={ProductDetail} />
        <Route exact path="/AddEdit" component={AddEdit} />
        {/* <Route exact path="/editProduct" component={EditProduct} /> */}
      </Switch>
    </Router>
  );
}

export default App;
