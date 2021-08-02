import React from "react";
import NavBar from "../components/navBar";
import ProductListing from "../containers/productListing";


function Home() {
  return (
    <div>
      <NavBar />
      <ProductListing />
    </div>
  );
}

export default Home;
