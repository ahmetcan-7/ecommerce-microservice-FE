import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { ProductApi } from "../../../api/productApi";
import Loader from "../../../components/Loader";
import Table from "../../../components/Table";
import { PRODUCT_ADMIN_PARAM } from "../../../constants/product";

function Products() {
  const [pageNo, setPageNo] = useState<number>(0);

  const {
    data: products,
    isLoading,
    isError,
    error,
    isFetched,
  } = useQuery("admin:products", () =>
    ProductApi.getProductsByPagination({ ...PRODUCT_ADMIN_PARAM, pageNo })
  );

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>{error as string}</div>;
  }

  const deleteItem = (id: string) => {};

  const editItem = (id: string) => {};

  if (isFetched) {
  }

  return (
    <>
      <h1>Products</h1>

      <Table products={products!} deleteItem={deleteItem} editItem={editItem} />
    </>
  );
}

export default Products;
