import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { ProductApi } from "../../../api/productApi";
import Loader from "../../../components/Loader";
import Table from "../../../components/Table";
import { PRODUCT_ADMIN_PARAM } from "../../../constants/product";
import { PRODUCT_COLUMNS } from "../../../constants/table";
import usePagination from "../../../hooks/usePagination";
import { ProductRow } from "../../../types/table";

function Products() {
  const { page, handleChangePage, handleChangeItemsPerPage, itemsPerPage } =
    usePagination();

  const {
    data: products,
    isLoading,
    isError,
    error,
    isFetched,
  } = useQuery(["admin:products", page, itemsPerPage], () =>
    ProductApi.getProductsByPagination({
      ...PRODUCT_ADMIN_PARAM,
      pageNo: page,
      pageSize: itemsPerPage,
    })
  );

  console.log("itemsPerPage", page);

  const deleteItem = (id: string) => {
    console.log("icon", id);
  };

  const editItem = (id: string) => {
    console.log("icon", id);
  };

  const productRows = products?.data.map(
    (product) =>
      new ProductRow(
        product.id,
        product.name,
        product.category.name,
        product.unitPrice,
        product.createdDate
      )
  );

  // if (isLoading) {
  //   return <Loader />;
  // }

  if (isError) {
    return <div>{error as string}</div>;
  }

  return (
    <>
      <h1>Products</h1>

      <Table
        rows={productRows}
        columns={PRODUCT_COLUMNS}
        deleteItem={deleteItem}
        editItem={editItem}
        totalSize={products?.totalSize}
        handleChangePage={handleChangePage}
        handleChangeItemsPerPage={handleChangeItemsPerPage}
        page={page}
        itemsPerPage={itemsPerPage}
      />
    </>
  );
}

export default Products;
