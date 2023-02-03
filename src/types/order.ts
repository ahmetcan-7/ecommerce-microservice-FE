export interface OrderParam {
  pageNo: number;
  pageSize: number;
}

export interface Order {
  id: string;
  customerId: string;
  address: OrderAdress;
  items: OrderItem[];
  orderStatus: OrderStatus;
  createdDate: string;
}

export interface CreateOrderRequest {
  items: OrderItem[];
  address: OrderAdress;
}

interface OrderAdress {
  city: string;
  district: string;
  addressDetail: string;
}

interface OrderItem {
  productId: string;
  quantity: number;
}

enum OrderStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  APPROVED = "APPROVED",
  CANCELLING = "CANCELLING",
  CANCELLED = "CANCELLED",
}

export interface OrderForm {
  district: string;
  city: string;
  addressDetail: string;
}
