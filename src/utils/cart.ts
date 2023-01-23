import { Cart } from "../types/cart";
export const calculateCountOfCartItems = (items: Cart[]) => {
  return items.reduce((accumalator, item) => accumalator + item.quantity, 0);
};
