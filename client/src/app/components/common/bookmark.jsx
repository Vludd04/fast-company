import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { addOrRemoveBookmark, getUserById } from "../../store/users";

const Bookmark = ({ userId }) => {
  const dispatch = useDispatch();
  const user = useSelector(getUserById(userId));

  const handleToggle = () => {
    if (user.bookmark === false) {
      const addToBookmark = {
        ...user,
        bookmark: true,
      };
      dispatch(addOrRemoveBookmark(addToBookmark));
    } else {
      const removeFromBookmark = {
        ...user,
        bookmark: false,
      };
      dispatch(addOrRemoveBookmark(removeFromBookmark));
    }
  };

  const isFavorite = user.bookmark === true;

  return (
    <button className="btn btn-light" onClick={handleToggle}>
      <i className={"bi bi-bookmark" + (isFavorite ? "-fill" : "")}></i>
    </button>
  );
};

Bookmark.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default Bookmark;
