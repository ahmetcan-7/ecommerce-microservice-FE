import { Cart } from "../types/cart";

export const calculateCountOfCartItems = (items: Cart[]) => {
  return items.reduce((accumalator, item) => accumalator + item.quantity, 0);
};

export const calculateTotalPriceOfCartItems = (items: Cart[]) => {
  return items
    .reduce(
      (accumalator, item) =>
        accumalator + item.quantity * item.product.unitPrice,
      0
    )
    .toFixed(2);
};

export const calculateTotalPriceOfOneProduct = (
  unitPrice: number,
  quantity: number
) => {
  return unitPrice * quantity;
};
