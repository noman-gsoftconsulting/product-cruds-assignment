import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import ProtectedRoute from "./utils/routes/protectedRoute";
import PublicRoute from "./utils/routes/publicRoute";
import SignIn from "./pages/signIn";
import ProductDetail from "./containers/productDetail";
import Home from "./pages/home.js";
import AddEdit from "./components/addUpdate"


function App() {
  return (
    <Router>
      <Switch>
        <PublicRoute exact path="/" restricted={false} component={SignIn} />
        <ProtectedRoute exact path="/home" component={Home} />
        {/* <Route exact path="/signup">
          <SignUp />
        </Route> */}
        <ProtectedRoute exact path="/product-detail/:id" component={ProductDetail} />
        <ProtectedRoute exact path="/add-product" component={() => <AddEdit title={`Add New Product`} button={`Submit`} />} />
        <ProtectedRoute exact path="/edit-product/:id" component={() => <AddEdit title={`Edit Product`} button={`Update`} />} />
      </Switch>
    </Router>
  );
}

export default App;