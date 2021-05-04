import axios from "axios";
import React, { useState } from "react";
import personService from "../services/persons";

const PersonForm = ({ persons, setPersons, message }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addPerson = (e) => {
    e.preventDefault();
    const newPerson = { name: newName, number: newNumber };

    if (newPerson.name === "" || newPerson.number === "") {
      message("Enter name and number.", "error");
    } else if (
      persons.filter((person) => person.name === newPerson.name).length > 0
    ) {
      if (
        window.confirm(
          `${newPerson.name} is already added to phonebook, replace the old number with a new  one?`
        )
      ) {
        const samePerson = persons.filter(
          (person) => person.name === newName
        )[0];
        personService
          .update({ ...samePerson, number: newPerson.number })
          .then((res) => {
            setPersons(
              persons.map((person) =>
                person.id === samePerson.id ? res : person
              )
            );
            setNewName("");
            setNewNumber("");
          })
          .catch(() => {
            message("The person does not exist", "error");
          });
      }
    } else {
      personService.create(newPerson).then((response) => {
        setPersons(persons.concat(newPerson));
        setNewName("");
        setNewNumber("");
        message(`Added ${newPerson.name}`, "success");
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
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleNameChange} value={newName} />
        </div>
        <div>
          number: <input onChange={handleNumberChange} value={newNumber} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
