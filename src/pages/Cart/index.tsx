import { Box, Button, Container, Typography } from "@material-ui/core";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { OrderApi } from "../../api/orderApi";
import Card from "../../components/Card";
import Modal from "../../components/Modal";
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

function Cart() {
  const items = useSelector((state: AppState) => state.cart);
  const [modalOpen, setModalOpen] = useState(false);
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

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const createMutation = useMutation(OrderApi.createOrder, {
    onSuccess: () => {
      showSuccess("Order has been created successfully");
      form.resetForm();
      dispatch(clearAllItems());
    },
  });
  return (
    <>
      <Typography variant="h2" align="center">
        Cart
      </Typography>
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
      >
        <form onSubmit={form.handleSubmit}>
          <TextInput name="city" label="city" form={form} />
          <TextInput name="district" label="district" form={form} />
          <TextInput name="addressDetail" label="addressDetail" form={form} />
          <Button
            color="secondary"
            variant="contained"
            fullWidth
            onClick={closeModal}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            onClick={closeModal}
          >
            Order
          </Button>
        </form>
      </Modal>
      {items.length > 0 && (
        <Button
          variant="contained"
          onClick={openModal}
          style={{ margin: "1rem auto", display: "block" }}
        >
          Order
        </Button>
      )}
    </>
  );
}

export default Cart;
