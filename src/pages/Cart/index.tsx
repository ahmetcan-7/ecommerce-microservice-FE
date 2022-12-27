import { Box, Container, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import Card from "../../components/Card";
import { AppState } from "../../store";

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
    </div>
  );
}

export default Cart;
