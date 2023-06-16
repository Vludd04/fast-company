import React, { useEffect } from "react";
import { orderBy } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import {
  createComment,
  getComments,
  getCommentsLoadingStatus,
  loadCommentsList,
  removeComment,
} from "../../store/comments";
import { useParams } from "react-router-dom";
import CommentsList, { AddCommentForm } from "../common/comments";

const Comments = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const isLoading = useSelector(getCommentsLoadingStatus());
  const comments = useSelector(getComments());

  const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

  useEffect(() => {
    dispatch(loadCommentsList(userId));
  }, [userId]);

  const handleSubmit = (data) => {
    dispatch(createComment({ ...data, pageId: userId }));
  };
  const handleRemoveComment = (id) => {
    dispatch(removeComment(id));
  };

  return (
    <>
      <div className="card mb-2">
        <div className="card-body ">
          <AddCommentForm onSubmit={handleSubmit} />
        </div>
      </div>
      {sortedComments.length > 0 && (
        <div className="card mb-3">
          <div className="card-body ">
            <h2>Comments</h2>
            <hr />
            {!isLoading ? (
              <CommentsList
                comments={sortedComments}
                onRemove={handleRemoveComment}
              />
            ) : (
              "Loading..."
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
