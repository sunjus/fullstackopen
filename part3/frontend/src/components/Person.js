import React from "react";
import personService from "../services/persons";

const Person = ({ person, persons, setPersons }) => {
  const handleDelete = (id) => {
    if (window.confirm(`Do you want to delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch(() => {
          alert("It does not exist");
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
