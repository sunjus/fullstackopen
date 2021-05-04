import React from "react";

const Filter = ({ handleFilter, filter }) => {
  return (
    <div>
      <div>
        filter shown with
        <input onChange={handleFilter} value={filter} />
      </div>
    </div>
  );
};

export default Filter;
