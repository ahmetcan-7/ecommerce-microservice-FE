import { Order, OrderParam } from "../types/order";
import { Pagination } from "../types/pagination";
import { api } from "./axios";

const getOrders = async (params: OrderParam) => {
  const { data } = await api.get<Pagination<Order[]>>("/v1/orders", {
    params,
  });
  return data;
};

export const OrderApi = {
  getOrders,
};
