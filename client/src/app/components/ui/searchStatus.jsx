import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
  const renderPhrase = (number) => {
    const lastOne = Number(number.toString().slice(-1));
    if (lastOne === 1) return "person";
    return "people";
  };
  return (
    <h2>
      <span className={"badge " + (length > 0 ? "bg-primary" : "bg-danger")}>
        {length > 0
          ? `${length + " " + renderPhrase(length)}   can meet you today`
          : "No one can meet you"}
      </span>
    </h2>
  );
};

SearchStatus.propTypes = {
  length: PropTypes.number,
};

export default SearchStatus;
