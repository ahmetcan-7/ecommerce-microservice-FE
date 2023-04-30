import React from "react";
import Comment from "./Comment";
import { Comment as CommentType } from "../../types/comment";
import { Box, Button, TextField, Typography } from "@material-ui/core";
import SendIcon from "@mui/icons-material/Send";
interface CommentsProps {
  comments: CommentType[];
  onCreateComment: (comment: string) => void;
}
function Comments({ comments, onCreateComment }: CommentsProps) {
  const [comment, setComment] = React.useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (comment) {
      onCreateComment(comment);
      setComment("");
    }
  };

  return (
    <>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4" component="h2" style={{ marginLeft: "1rem" }}>
          Comments
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <TextField
              label="Comment"
              variant="filled"
              value={comment}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setComment(event.target.value);
              }}
            />
            <Button variant="contained" endIcon={<SendIcon />} type="submit">
              Create
            </Button>
          </Box>
        </form>
      </Box>

      {comments?.map((comment) => (
        <Comment comment={comment} />
      ))}
    </>
  );
}

export default Comments;
