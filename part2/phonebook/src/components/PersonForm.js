import React, { useState } from "react";
import services from "../services/services";

const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addPerson = (e) => {
    e.preventDefault();
    //console.log(e.target);

    const newPerson = {
      name: newName,
      number: newNumber,
    };
    const names = persons.map((p) => p.name.toLowerCase());

    names.indexOf(newPerson.name.toLowerCase()) > -1
      ? updatePerson(newName, newNumber)
      : services.create(newPerson).then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
        });
  };

  const updatePerson = (name, newNumber) => {
    const person = persons.find(
      (p) => p.name.toLowerCase() === name.toLowerCase()
    );

    const id = person.id;
    const updatedPerson = { ...person, number: newNumber };

    if (
      window.confirm(
        `${name} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      services
        .update(id, updatedPerson)
        .then((returnedPerson) => {
          console.log("update", returnedPerson);
          setPersons(
            persons.map((person) =>
              person.id !== id ? person : returnedPerson.data
            )
          );
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          alert(`the person '${person.name}' was already deleted from server`);
          setPersons(
            persons.filter((p) => p.name.toLowerCase() !== name.toLowerCase())
          );
        });
    }
  };

  const handleInputName = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setNewName(e.target.value);
  };

  const handleInputNumber = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setNewNumber(e.target.value);
  };

  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleInputName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleInputNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
