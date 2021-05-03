import React from "react";
import Person from "./Person";

const Persons = ({ persons, filteredPerson, setPersons, notice }) => {
  const filteredPersons =
    filteredPerson === ""
      ? persons
      : persons.find((person) =>
          person.name.toLowerCase().includes(filteredPerson.toLowerCase())
        );
  return (
    <div>
      {filteredPersons.map((person, i) => (
        <Person
          key={i}
          persons={persons}
          person={person}
          setPersons={setPersons}
          notice={notice}
        />
      ))}
    </div>
  );
};

export default Persons;
