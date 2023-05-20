import { Box, Button, Container, Typography } from "@material-ui/core";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { OrderApi } from "../../api/orderApi";
import Card from "../../components/Card";
import Modal from "../../components/Modal";
import SelectInput from "../../components/SelectInput";
import TextInput from "../../components/TextInput";
import orderForm from "../../forms/orderForm";
import { AppState } from "../../store";
import { clearAllItems } from "../../store/actions/cartAction";
import { CreateOrderRequest } from "../../types/order";
import {
  calculateCountOfCartItems,
  calculateTotalPriceOfCartItems,
} from "../../utils/cart";
import { showSuccess } from "../../utils/showSuccess";
import { ProductApi } from "../../api/productApi";
import { showError } from "../../utils/showError";
import { LoadingButton } from "@mui/lab";
import { useSearchParams } from "react-router-dom";

function Cart() {
  const [searchParams, setSearchParams] = useSearchParams();
  const items = useSelector((state: AppState) => state.cart);
  const [modalOpen, setModalOpen] = useState(
    searchParams.get("order") === "true"
  );
  const [districts, setDistricts] = useState([]);
  const dispatch = useDispatch<any>();
  const form = useFormik({
    ...orderForm,
    onSubmit: (values) => {
      const products = items.map((item) => {
        return { productId: item.product.id, quantity: item.quantity };
      });
      const order = { address: values, items: products } as CreateOrderRequest;
      createMutation.mutate(order);
    },
  });

  useEffect(() => {
    setDistricts(getDistricts(form.values.city));
  }, [form.values.city]);

  const openModal = () => {
    setModalOpen(true);
    setSearchParams({
      order: "true",
    });
  };

  const closeModal = () => {
    setModalOpen(false);
    setSearchParams({
      order: "false",
    });
    form.resetForm();
  };

  const createMutation = useMutation(OrderApi.createOrder, {
    onSuccess: () => {
      showSuccess("Order has been created successfully");
      dispatch(clearAllItems());
      closeModal();
    },
    onError: (e: any) => {
      const res = e.response?.data?.message as string;
      getProducts(res);
    },
  });

  let citiesAndDistrict = require("../../db.json");

  const cities = citiesAndDistrict.map((city: any) => {
    return { name: city.il_adi, id: city.il_adi };
  });

  const getDistricts = (cityName: string) => {
    return citiesAndDistrict
      .find((city: any) => city.il_adi === cityName)
      ?.ilceler.map((district: any) => {
        return { name: district.ilce_adi, id: district.ilce_adi };
      });
  };

  const getProducts = async (res: string) => {
    const productIds = res.substring(1, res.length - 1).split(",") as string[];
    const products = await ProductApi.getProductsByIds(productIds);
    const productNames = products.map((product) => product.name);
    showError(`${productNames} not in stock!`);
  };

  /*
    // - Cache Api example   
  
    function saveFormDataToCache(formData: any) {
      if ("caches" in window) {
        caches.open("formCache").then((cache) => {
          const request = new Request("form-data", {
            method: "GET",
          });

          const response = new Response(JSON.stringify(formData));

          cache.put(request, response).then(() => {
            console.log("Data updated in cache");
          });
        });
      }
    }

    function loadFormDataFromCache() {
      return new Promise((resolve, reject) => {
        if ("caches" in window) {
          caches.open("formCache").then((cache) => {
            cache.match("form-data").then((response) => {
              if (response) {
                response.json().then((data) => {
                  resolve(data);
                  form.setValues(data);
                  console.log("gelen data", data);
                });
              } else {
                reject(new Error("Form data not found in cache."));
              }
            });
          });
        } else {
          reject(new Error("Cache API is not supported."));
        }
      });
    }

    useEffect(() => {
      loadFormDataFromCache();
    }, []);

    useEffect(() => {
      saveFormDataToCache(form.values);
    }, [form]);

  */

  useEffect(() => {
    const savedFormData = sessionStorage.getItem("cart_form");
    if (savedFormData) {
      form.setValues(JSON.parse(savedFormData));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("cart_form", JSON.stringify(form.values));
  }, [form]);

  return (
    <>
      <Container maxWidth="sm">
        {items.map((item) => (
          <Box style={{ margin: "1rem 0" }}>
            <Card key={item.product.id} product={item.product} />
          </Box>
        ))}
      </Container>
      <Typography variant="h5" align="center">
        There are {calculateCountOfCartItems(items)} items and total price is{" "}
        {calculateTotalPriceOfCartItems(items)} TL
      </Typography>
      <Modal
        open={modalOpen}
        setOpen={setModalOpen}
        title="Please enter your informations"
        disableBtn={true}
        onClose={closeModal}
      >
        <form onSubmit={form.handleSubmit}>
          <SelectInput name="city" label="city" form={form} data={cities} />
          <SelectInput
            name="district"
            label="district"
            form={form}
            data={districts}
          />
          <TextInput name="addressDetail" label="addressDetail" form={form} />
          <Button
            color="secondary"
            variant="contained"
            fullWidth
            onClick={closeModal}
          >
            Cancel
          </Button>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Order
          </Button>
        </form>
      </Modal>
      {items.length > 0 && (
        <LoadingButton
          variant="contained"
          onClick={openModal}
          style={{ margin: "1rem auto", display: "block" }}
          loading={createMutation.isLoading}
        >
          Order
        </LoadingButton>
      )}
    </>
  );
}

export default Cart;
