import axios from "axios";
import React, { useState } from "react";
import personService from "../services/persons";

const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addPersons = (e) => {
    e.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    if (persons.filter((person) => person.name === newPerson.name).length > 0) {
      alert(`${newName} is already added to phonebook`);
    } else {
      personService.create(newPerson).then((response) => {
        setPersons(persons.concat(newPerson));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  return (
    <div>
      <form onSubmit={addPersons}>
        <div>
          name: <input onChange={handleNameChange} value={newName} />
        </div>
        <div>
          number: <input onChange={handleNumberChange} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
