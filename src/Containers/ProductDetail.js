import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { getProductDetail } from "../Redux/Actions/Auth";

function ProductDetail() {
  const { id } = useParams();
  const product = useSelector((state) => state.productDetail);
//   console.log(product);
  const dispatch = useDispatch();
//   const history = useHistory();
  useEffect(() => {
    dispatch(getProductDetail(id));
  }, []);

  return (
    <div>
      <p>Product Detail Page</p>
      <img src="{product.coverPhoto.url}" alt="Images"/>
      <div>{product.id}</div>
      <div>${product.price}</div>
      <div>{product.description}</div>
    </div>
  );
}

export default ProductDetail;
