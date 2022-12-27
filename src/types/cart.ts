import { ThunkDispatch } from "redux-thunk";
import { Product } from "./product";

export interface Cart {
  product: Product;
  quantity: number;
}

interface ADD_TO_CART {
  type: "ADD_TO_CART";
  payload: Cart;
}

interface REMOVE_FROM_CART {
  type: "REMOVE_FROM_CART";
  payload: string;
}

interface DECREASE_PRODUCT_QUANTITY {
  type: "DECREASE_PRODUCT_QUANTITY";
  payload: string;
}

interface INCREASE_PRODUCT_QUANTITY {
  type: "INCREASE_PRODUCT_QUANTITY";
  payload: string;
}

export type CartAction =
  | ADD_TO_CART
  | REMOVE_FROM_CART
  | DECREASE_PRODUCT_QUANTITY
  | INCREASE_PRODUCT_QUANTITY;

export type CartState = Cart[];

export type CartDispatch = ThunkDispatch<CartState, void, CartAction>;
