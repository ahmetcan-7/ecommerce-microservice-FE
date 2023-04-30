export interface Comment {
  id: string;
  createdBy: string;
  createdDate: string;
  text: string;
  creator: string;
}

export interface CreateCommentRequest {
  productId: string;
  text: string;
}
