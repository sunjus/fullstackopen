import React from "react";

const Filter = ({ filteredPerson, setFilteredPerson }) => {
  return (
    <div>
      filter shown with
      <input
        onChange={(e) => setFilteredPerson(e.target.value)}
        value={filteredPerson}
      />
    </div>
  );
};

export default Filter;
