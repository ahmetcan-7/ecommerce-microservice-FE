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
import { Product } from "../../types/product";
import { IconButton, useTheme } from "@material-ui/core";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useDispatch } from "react-redux";
import {
  addToCart,
  decreaseProductQuantity,
  increaseProductQuantity,
  removeFromCart,
} from "../../store/actions/cartAction";
import { getFromLocalStorage } from "../../utils/localStorage";
import { Cart } from "../../types/cart";
import "./style.css";
type CardProps = {
  product: Product;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Card = ({ product, onClick }: CardProps) => {
  const getCartItemQuantity = (id: string) => {
    const persist = getFromLocalStorage("persist:root");
    const items = JSON.parse(persist.cart) as Cart[];

    const findedItem = items?.find((item) => item.product.id === id);
    return findedItem?.quantity ?? 0;
  };

  const dispatch = useDispatch<any>();
  const [quantity, setQuantity] = useState<number>(
    getCartItemQuantity(product.id)
  );

  const handleAdd = () => {
    setQuantity((prev) => prev + 1);
    if (quantity === 0) {
      dispatch(addToCart({ product: product, quantity: 1 }));
    } else {
      dispatch(increaseProductQuantity(product.id));
    }
  };

  const handleRemove = () => {
    setQuantity((prev) => prev - 1);
    if (quantity === 1) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(decreaseProductQuantity(product.id));
    }
  };

  const handleClick = (event: any) => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <MuiCard onDoubleClick={handleClick}>
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
      <CardActions sx={{ height: "4rem" }}>
        {quantity ? (
          <>
            <Box onClick={handleRemove}>
              {quantity === 1 ? (
                <IconButton aria-label="previous">
                  <DeleteForeverIcon color="primary" />
                </IconButton>
              ) : (
                <IconButton aria-label="play/pause">
                  <RemoveCircleOutlineIcon color="primary" />
                </IconButton>
              )}
            </Box>
            <span>{quantity}</span>
            <IconButton aria-label="next" onClick={handleAdd}>
              <AddCircleOutlineIcon color="primary" />
            </IconButton>
          </>
        ) : (
          <IconButton onClick={handleAdd}>
            <AddShoppingCartIcon color="primary" />
          </IconButton>
        )}
      </CardActions>
    </MuiCard>
  );
};

export default Card;
