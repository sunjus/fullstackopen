import React, { useState } from "react";

const Filter = ({ handleFilterChange, filteredPersons }) => {
  return (
    <div>
      filter shown with
      <input onChange={handleFilterChange} />
      {filteredPersons.map((p, i) => (
        <div key={i}>
          {p.name} {p.number}
        </div>
      ))}
    </div>
  );
};

export default Filter;
