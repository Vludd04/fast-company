import React from "react";

const SearchBar = ({ onSearchChange, value }) => {
    return (
        <div className="form-outline">
            <input
                type="search"
                id="search"
                className="form-control"
                placeholder="Поиск..."
                value={value}
                onChange={onSearchChange}
            />
        </div>
    );
};

export default SearchBar;
