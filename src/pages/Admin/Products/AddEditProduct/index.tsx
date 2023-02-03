import { Box, Button, IconButton } from "@material-ui/core";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CategoryApi } from "../../../../api/categoryApi";
import { ProductApi } from "../../../../api/productApi";
import Loader from "../../../../components/Loader";
import SelectInput from "../../../../components/SelectInput";
import TextInput from "../../../../components/TextInput";
import productForm from "../../../../forms/productForm";
import { ProductAdmin, ProductForm } from "../../../../types/product";
import { showSuccess } from "../../../../utils/showSuccess";
import { useState, ChangeEvent } from "react";
import { FileApi } from "../../../../api/file";
import ClearIcon from "@mui/icons-material/Clear";

interface AddEditProductLocation {
  state: ProductAdmin;
}

function AddEditProduct() {
  const navigate = useNavigate();
  const { state: productParam }: AddEditProductLocation = useLocation();
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
    initialValues: productForm.initialValues(MODE === "edit"),
    validationSchema: productForm.validationSchema(MODE === "edit"),
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
        ...productForm.initialValues(),
        ...newProduct,
      };
      form.setValues(initialFormData, false);
    }
  };

  const addProduct = (data: ProductForm) => {
    createMutation.mutate(data);
  };

  const editProduct = (data: ProductForm) => {
    editMutation.mutate({ data, id: product.id });
  };

  const editMutation = useMutation(ProductApi.updateProduct, {
    onSuccess: () => {
      showSuccess("Product has been updated successfully");
      navigate(`/admin/products`);
    },
  });

  const createMutation = useMutation(ProductApi.saveProduct, {
    onSuccess: () => {
      showSuccess("Product has been created successfully");
      navigate(`/admin/products`);
    },
  });

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const fileData = new FormData();
    fileData.append("file", e.target.files[0]);
    const res = await FileApi.saveFile(fileData);
    form.setFieldValue("imageUrl", res);
  };

  const handleRemoveFile = async () => {
    const res = await FileApi.removeFile(
      form.values.imageUrl.split("/").pop() ?? ""
    );
    form.setFieldValue("imageUrl", "");
  };

  if (isLoading) <Loader />;
  return (
    <>
      <form onSubmit={form.handleSubmit}>
        <TextInput name="name" label="Product Name" form={form} />
        <TextInput
          name="unitPrice"
          label="Unit Price"
          form={form}
          type="number"
        />
        <SelectInput
          name="categoryId"
          label="Select Category"
          form={form}
          data={categories}
        />
        <TextInput name="description" label="Description" form={form} />

        {MODE === "add" && (
          <TextInput
            name="quantityInStock"
            label="Quantity In Stock"
            form={form}
            type="number"
          />
        )}
        <Box style={{ display: "flex", marginBottom: "0.4rem" }}>
          {form.values.imageUrl && (
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "1.5rem",
              }}
            >
              <img src={form.values.imageUrl} width={80} height={50} />

              <IconButton
                aria-label="delete"
                color="secondary"
                onClick={handleRemoveFile}
              >
                <ClearIcon />
              </IconButton>
            </Box>
          )}
          <Button variant="contained" component="label">
            Upload File
            <input
              type="file"
              hidden
              onChange={handleFileChange}
              accept="image/*"
            />
          </Button>
        </Box>
        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          disabled={isLoading}
          // disabled={isLoading || !(form.isValid && form.dirty)}
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
