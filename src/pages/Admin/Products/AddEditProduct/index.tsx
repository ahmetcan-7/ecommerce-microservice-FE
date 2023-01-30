import { Button } from "@material-ui/core";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";
import { CategoryApi } from "../../../../api/categoryApi";
import { ProductApi } from "../../../../api/productApi";
import Loader from "../../../../components/Loader";
import SelectInput from "../../../../components/SelectInput";
import TextInput from "../../../../components/TextInput";
import productForm from "../../../../forms/productForm";
import { ProductAdmin, ProductForm } from "../../../../types/product";

function AddEditProduct() {
  const { state } = useLocation();
  const productParam = state?.product as ProductAdmin;
  const { productId } = useParams();

  const { isLoading, data } = useQuery(["admin:product"], () => {
    if (productId && !productParam) return ProductApi.getProductById(productId);
  });

  const { data: categories } = useQuery(["admin:categories"], () =>
    CategoryApi.getCategories()
  );

  const product = productParam ?? data;
  const MODE = product ? "edit" : "add";
  const form = useFormik({
    ...productForm,
    onSubmit: (values) => {
      if (MODE === "add") {
        addProduct(values);
      } else {
        editProduct(values);
      }
    },
  });

  useEffect(() => {
    setInitialValues();
  }, []);

  const setInitialValues = () => {
    if (MODE === "edit") {
      const newProduct = {
        ...product,
        categoryId: product.category?.id,
      } as Partial<Pick<ProductAdmin, "createdDate" | "id" | "category">>;
      delete newProduct.id;
      delete newProduct.createdDate;
      delete newProduct.category;

      const initialFormData = {
        ...productForm.initialValues,
        ...newProduct,
      };
      form.setValues(initialFormData, false);
    }
  };

  const addProduct = (values: ProductForm) => {
    console.log("values", values);
  };

  const editProduct = (values: ProductForm) => {
    console.log("values", values);
  };

  console.log("categories", categories);
  if (isLoading) <Loader />;
  return (
    <>
      <form onSubmit={form.handleSubmit}>
        <TextInput name="name" label="Product Name" form={form} />
        <TextInput name="unitPrice" label="Unit Price" form={form} />
        <SelectInput
          name="categoryId"
          label="Select Category"
          form={form}
          data={categories}
        />
        <TextInput name="description" label="Description" form={form} />
        <TextInput
          name="quantityInStock"
          label="Quantity In Stock"
          form={form}
          type="number"
        />

        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          disabled={isLoading}
        >
          {MODE}
        </Button>
      </form>
    </>
  );
}

export default AddEditProduct;

//   const { data: products } =
//     (queryClient.getQueriesData("admin:products")[0][1] as Pagination<
//       ProductAdmin[]
//     >) ;
//   const product = products.find((item) => item.id === productId);
