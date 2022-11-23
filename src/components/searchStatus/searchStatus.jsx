import React from "react";
import style from "./style.module.css";

const SearchStatus = ({ length }) => {
  const renderPhrase = (number) => {
    const lastOne = Number(number.toString().slice(-1));
    if (number > 4 && number < 15) return "человек тусанет";
    if ([2, 3, 4].indexOf(lastOne) >= 0) return "человека тусанут";
    if (lastOne === 1) return "человек тусанет";
    return "человек тусанет";
  };

  return (
    <div className={style.wrapper}>
      <div
        className={`badge mb-2 p-2 ${length > 0 ? "bg-primary" : "bg-danger"}`}
      >
        <h5>
          {length > 0
            ? `${length} ${renderPhrase(length)} с тобой сегодня`
            : "С тобой никто не тусанет"}
        </h5>
      </div>
    </div>
  );
};

export default SearchStatus;
