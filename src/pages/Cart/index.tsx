import { Box, Container, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import Card from "../../components/Card";
import { AppState } from "../../store";
import {
  calculateCountOfCartItems,
  calculateTotalPriceOfCartItems,
} from "../../utils/cart";

function Cart() {
  const items = useSelector((state: AppState) => state.cart);

  return (
    <div>
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
    </div>
  );
}

export default Cart;
