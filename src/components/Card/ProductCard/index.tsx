import React, { Key, useState } from "react";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Button,
  CardActionArea,
  CardActions,
  Card as MuiCard,
  Box,
} from "@mui/material";
import { ProductAdmin } from "../../../types/product";

type CardProps = {
  product: ProductAdmin;
};

const ProductCard = ({ product }: CardProps) => {
  return (
    <MuiCard>
      <CardActionArea sx={{ display: "flex", flexDirection: "column" }}>
        <CardMedia
          component="img"
          height="200"
          image={product.imageUrl ?? ""}
          style={{ width: "auto" }}
        />
        <CardContent style={{ width: "100%" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography gutterBottom variant="h5" component="div">
              {product.name}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              {product.unitPrice.toString()} TL
            </Typography>
          </Box>
          <Box style={{ height: "3rem" }}>
            <Typography
              variant="body2"
              color="text.secondary"
              className="text-ellipsis"
            >
              {product.description}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ height: "4rem" }}></CardActions>
    </MuiCard>
  );
};

export default ProductCard;
