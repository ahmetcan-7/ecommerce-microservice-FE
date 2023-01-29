import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { ProductApi } from "../../../api/productApi";
import Loader from "../../../components/Loader";
import Modal from "../../../components/Modal";
import Table from "../../../components/Table";
import { PRODUCT_ADMIN_PARAM } from "../../../constants/product";
import { PRODUCT_COLUMNS } from "../../../constants/table";
import usePagination from "../../../hooks/usePagination";
import { ProductRow } from "../../../types/table";

function Products() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [productId, setProductId] = useState<string>();
  const { page, handleChangePage, handleChangeItemsPerPage, itemsPerPage } =
    usePagination();

  const queryClient = useQueryClient();

  const { data: products } = useQuery(
    ["admin:products", page, itemsPerPage],
    () =>
      ProductApi.getProductsByPagination({
        ...PRODUCT_ADMIN_PARAM,
        pageNo: page,
        pageSize: itemsPerPage,
      })
  );

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

  const deleteItem = (id: string) => {
    setProductId(id);
    setModalOpen(true);
  };

  const handleClickModal = () => {
    deleteMutation.mutate(productId!);
  };

  const editItem = (productRow: ProductRow) => {
    const product = products?.data.find((item) => item.id === productRow.id);
    navigate(`/admin/addEditProduct/${productRow.id}`, {
      state: { product },
    });
  };

  const deleteMutation = useMutation(ProductApi.deleteProduct, {
    onSuccess: () => queryClient.invalidateQueries("admin:products"),
  });

  return (
    <>
      <h1>Products</h1>
      <Modal
        open={modalOpen}
        setOpen={setModalOpen}
        onClickModal={handleClickModal}
        title="Product delete action"
        content="Are you sure you want to delete item?"
      />
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
