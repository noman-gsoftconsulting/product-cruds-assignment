import React from "react";
import NavBar from "../Components/NavBar";
import ProductListing from "../Containers/ProductListing";
// import AlertMessage from "../Components/AlertMessage";


function Home() {
  return (
    <div>
      <NavBar />
      <ProductListing />
      {/* <AlertMessage /> */}
    </div>
  );
}

export default Home;
