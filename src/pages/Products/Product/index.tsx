import React from "react";
import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";
import { ProductApi } from "../../../api/productApi";
import ProductCard from "../../../components/Card/ProductCard";

function Product() {
  const { productId } = useParams();

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery(["products:product"], () =>
    ProductApi.getProductById(productId ?? "")
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  if (!product) {
    return <div>Data not found</div>;
  }

  return (
    <>
      <div>Product</div>
      <ProductCard product={product} />
    </>
  );
}

export default Product;
