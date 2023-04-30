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
import Comments from "../../Comments";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { ProductApi } from "../../../api/productApi";

type CardProps = {
  product: ProductAdmin | undefined;
};

const ProductCard = ({ product }: CardProps) => {
  const { productId } = useParams();

  const {
    data: comments,
    isLoading,
    isError,
  } = useQuery(["products:comments"], () =>
    ProductApi.getCommentsByProductId(productId ?? "")
  );

  return (
    <MuiCard>
      <CardActionArea sx={{ display: "flex", flexDirection: "column" }}>
        <CardMedia
          component="img"
          height="200"
          image={product?.imageUrl ?? ""}
          style={{ width: "auto" }}
        />
        <CardContent style={{ width: "100%" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography gutterBottom variant="h5" component="div">
              {product?.name}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              {product?.unitPrice?.toString()} TL
            </Typography>
          </Box>
          <Box style={{ height: "3rem" }}>
            <Typography
              variant="body2"
              color="text.secondary"
              className="text-ellipsis"
            >
              {product?.description}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      <Comments comments={comments ?? []} />
    </MuiCard>
  );
};

export default ProductCard;
