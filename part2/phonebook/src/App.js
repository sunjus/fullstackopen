import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    personService
      .getAll()
      .then((initialPhonebook) => {
        setPersons(initialPhonebook);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //1. Filter section :Check if the name already exists in the phonebook
  const handleFilterChange = (e) => {
    setFilteredPersons(
      persons.filter((p) =>
        p.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  //2. PersonForm section
  const handleSubmit = (e) => {
    e.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    const checkedPerson = persons.find(
      (p) => p.name.toLowerCase() === newName.toLowerCase()
    );

    if (checkedPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        checkedPerson.number = newNumber;
        personService.update(checkedPerson.id, checkedPerson);
      }
    } else {
      personService.create(newPerson);
    }
    setNewName("");
    setNewNumber("");
  };

  //Delete person
  const handleDelete = (e) => {
    if (window.confirm(`Do you want to delete ${e.target.name}?`)) {
      console.log(e.target.value);
      console.log(e.target.name);
      personService
        .remove(e.target.value)
        .then(() => {
          personService.getAll().then((returnedName) => {
            setPersons(returnedName);
          });
        })
        .catch((err) => {
          console.log("Person does not exist");
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filteredPersons={filteredPersons}
        handleFilterChange={handleFilterChange}
      />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        handleSubmit={handleSubmit}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
