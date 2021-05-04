import React from "react";
import personService from "../services/persons";

const Person = ({ person, persons, setPersons, message }) => {
  const handleDelete = (id) => {
    if (window.confirm(`Do you want to delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          message(`${person.name} has been removed from server`, "success");
        })
        .catch(() => {
          message(
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
      {person.name}
      {":"} {person.number}
      {"  "}
      <button onClick={() => handleDelete(person.id)}>Delete</button>
    </div>
  );
};

export default Person;
