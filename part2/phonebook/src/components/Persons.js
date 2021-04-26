import React from "react";

const Persons = ({ persons }) => {
  return (
    <ul>
      {persons.map((p, i) => (
        <div key={i}>
          {p.name}
          {p.number}
        </div>
      ))}
    </ul>
  );
};

export default Persons;
