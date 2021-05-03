import React from "react";

import personService from "../services/personService";

const Person = ({ persons, person, setPersons, notice }) => {
  const handleDelete = (id) => {
    if (window.confirm(`Do you want to delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          notice(
            `${person.name} has been successfully removed from server`,
            "success"
          );
        })
        .catch(() => {
          notice(
            `${person.name} has been already removed from server`,
            "error"
          );
        })
        .finally(() => {
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };
  return (
    <div>
      {person.name} {person.number}
      <button onClick={() => handleDelete(person.id)}>Delete</button>
    </div>
  );
};

export default Person;
