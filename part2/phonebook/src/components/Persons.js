import React from "react";
import Person from "./Person";

const Persons = ({ filter, persons, setPersons, message }) => {
  const filterPersons =
    filter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        );
  return (
    <div>
      {filterPersons.map((person, i) => (
        <Person
          key={i}
          person={person}
          persons={persons}
          setPersons={setPersons}
          message={message}
        />
      ))}
    </div>
  );
};

export default Persons;
