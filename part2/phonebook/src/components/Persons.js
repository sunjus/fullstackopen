import React from "react";

const Persons = ({ persons, handleDelete }) => {
  return (
    <ul>
      {persons.map((p, i) => (
        <div key={i}>
          {p.name}
          {p.number}
          <button onClick={handleDelete} name={p.name} value={p.id}>
            delete
          </button>
        </div>
      ))}
    </ul>
  );
};

export default Persons;
