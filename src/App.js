import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./Utils/Routes/ProtectedRoute";
import SignIn from "./Pages/SignIn";
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
        <Route exact path="/product-Detail/:id" component={ProductDetail} />
        <Route exact path="/add-Product" component={() => <AddEdit title={`Add New Product`} button={`Submit`} />} />
        <Route exact path="/edit-Product/:id" component={() => <AddEdit title={`Edit Product`} button={`Update`} />} />
      </Switch>
    </Router>
  );
}

export default App;
