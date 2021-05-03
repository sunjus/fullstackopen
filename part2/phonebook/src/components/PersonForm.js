import React, { useState } from "react";

import personService from "../services/personService";

const PersonForm = ({ persons, setPersons, notice }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addPerson = (e) => {
    e.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    if (newPerson.name === "" || newPerson.number === "") {
      notice("Enter name and number", "error");
    } else if (
      persons.filter(
        (p) => p.name.toLowerCase() === newPerson.name.toLowerCase()
      ).length > 0
    ) {
      if (
        window.confirm(
          `${newPerson.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const samePerson = persons.filter((p) => p.name === newName)[0];
        personService
          .update({ ...samePerson, number: newPerson.number })
          .then((res) => {
            setPersons(persons.map((p) => (p.id === samePerson.id ? res : p)));
            setNewName("");
            setNewNumber("");
            notice(
              `${samePerson.name} number was successfully updated`,
              "success"
            );
          })
          .catch(() => {
            setPersons(persons.filter((p) => p.id !== samePerson.id));
            notice(`${samePerson.name} does not exist`, "error");
          });
      }
    } else {
      personService.create(newPerson).then((res) => {
        setPersons(persons.concat(res));
        setNewName("");
        setNewNumber("");
        notice(`Added ${newPerson.name}`, "success");
      });
    }
  };

  return (
    <form onSubmit={addPerson}>
      <div>
        name:{" "}
        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        number:{" "}
        <input
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
