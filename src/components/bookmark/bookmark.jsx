import React from "react";
import bookmarkTrue from "./bookmarkTrue.svg";
import bookmarkFalse from "./bookmarkFalse.svg";
import PropTypes from "prop-types";

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

Bookmark.propTypes = {
    status: PropTypes.bool.isRequired
};
export default Bookmark;
