import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { useLocation, useParams } from "react-router-dom";
import { ProductApi } from "../../../../api/productApi";
import Loader from "../../../../components/Loader";
import { Pagination } from "../../../../types/pagination";
import { ProductAdmin } from "../../../../types/product";
import { ProductRow } from "../../../../types/table";

interface State {
  state: ProductAdmin;
}

function AddEditProduct() {
  const { state }: State = useLocation();
  const { productId } = useParams();

  const { isLoading, data } = useQuery(["admin:product"], () => {
    if (productId && !state) return ProductApi.getProductById(productId);
  });

  const product = state ?? data;
  const mode = product ? "edit" : "add";

  if (isLoading) <Loader />;
  return (
    <>
      <div>AddEditProduct</div>
    </>
  );
}

export default AddEditProduct;

//   const { data: products } =
//     (queryClient.getQueriesData("admin:products")[0][1] as Pagination<
//       ProductAdmin[]
//     >) ;
//   const product = products.find((item) => item.id === productId);
