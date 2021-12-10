import React from "react";
import services from "../services/services";

const Person = ({ person, persons, setPersons }) => {
  const handleDelete = (id) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      services.remove(id).then(() =>
        services.getAll().then((initialPersons) => {
          console.log("delete", initialPersons.data);
          setPersons(initialPersons.data);
        })
      );
    }
  };

  return (
    <div>
      {person.name}
      {person.number}
      <button onClick={() => handleDelete(person.id)}>delete</button>
    </div>
  );
};

const Persons = ({ persons, search, setPersons }) => {
  const searchPerson =
    search === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(search.toLowerCase())
        );
  return (
    <div>
      {searchPerson.map((person, index) => (
        <Person
          person={person}
          key={index}
          persons={persons}
          setPersons={setPersons}
        />
      ))}
    </div>
  );
};

export default Persons;
