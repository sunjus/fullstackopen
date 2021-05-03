import React from "react";
import Person from "./Person";

const Persons = ({ filter, persons, person }) => {
  const filterPersons =
    filter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        );
  return (
    <div>
      {filterPersons.map((person, i) => (
        <Person key={i} person={person} />
      ))}
    </div>
  );
};

export default Persons;
