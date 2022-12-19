export interface ProductParam {
  size: Number;
  page: Number;
  filter: String;
  sort: String;
  searchTerm: String;
}

export interface Product {
  id: String;
  name: String;
  unitPrice: Number;
  categoryName: String;
  description: String;
}
