import { CreateCommentRequest } from "../types/comment";
import { api } from "./axios";

const saveComment = async (comment: CreateCommentRequest) => {
  const { data } = await api.post("/v1/comments", comment);

  return data;
};

export const CommentApi = {
  saveComment,
};
