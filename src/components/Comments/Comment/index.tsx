import React from "react";
import { Avatar, Grid, Paper } from "@material-ui/core";
import { Comment as CommentType } from "../../../types/comment";
import moment from "moment";

interface CommentsProps {
  comment: CommentType;
}

function Comment({ comment }: CommentsProps) {
  return (
    <>
      <Paper style={{ padding: "1rem" }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar alt="Remy Sharp" src={""} />
          </Grid>
          <Grid item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}>{comment?.creator}</h4>
            <p style={{ textAlign: "left" }}>{comment?.text}</p>
            <p style={{ textAlign: "left", color: "gray" }}>
              {moment(comment?.createdDate).format("YYYY-MM-DD HH:mm:ss")}
            </p>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default Comment;
