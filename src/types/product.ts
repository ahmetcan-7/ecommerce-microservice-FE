export interface ProductParam {
  size: number;
  page: number;
  filter: string;
  sort: string;
  searchTerm: string;
}

export interface Product {
  id: string;
  name: string;
  unitPrice: number;
  categoryName: string;
  description: string;
}
