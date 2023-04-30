import React from "react";
import Comment from "./Comment";
import { Comment as CommentType } from "../../types/comment";

interface CommentsProps {
  comments: CommentType[];
}
function Comments({ comments }: CommentsProps) {
  return (
    <>
      <h1>Comments</h1>
      {comments?.map((comment) => (
        <Comment comment={comment} />
      ))}
    </>
  );
}

export default Comments;
