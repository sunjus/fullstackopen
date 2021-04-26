import React, { useState } from "react";

const Filter = ({ persons }) => {
  const [filteredPersons, setFilteredPersons] = useState([]);

  const handleFilterChange = (e) => {
    setFilteredPersons(
      persons.filter((p) =>
        p.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

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
