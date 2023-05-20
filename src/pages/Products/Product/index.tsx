import React from "react";
import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";
import { ProductApi } from "../../../api/productApi";
import ProductCard from "../../../components/Card/ProductCard";
import { Container } from "@material-ui/core";

function Product() {
  const { productId } = useParams();

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery(["products:product"], () =>
    ProductApi.getProductById(productId ?? "")
  );

  console.log("product", product);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <>
      <Container maxWidth="md" style={{ marginTop: "1rem" }}>
        <ProductCard product={product} />
      </Container>
    </>
  );
}

export default Product;
