import React from "react";
import bookmarkTrue from "./bookmarkTrue.svg";
import bookmarkFalse from "./bookmarkFalse.svg";

const Bookmark = ({ status, ...rest }) => {
  return (
    <button onClick={() => rest.handleChangeBookmarkStatus()}>
      {status === true ? (
        <img src={bookmarkTrue} alt="bookmarkTrue" />
      ) : (
        <img src={bookmarkFalse} alt="bookmarkFalse" />
      )}
    </button>
  );
};
export default Bookmark;
