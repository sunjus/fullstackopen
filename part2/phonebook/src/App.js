import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";
import "./index.css";

const App = () => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [persons, setPersons] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    personService
      .getAll()
      .then((initialPhonebook) => {
        setPersons(initialPhonebook);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [persons]);

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
        setErrorMessage(`Updated ${newPerson.name}`);
        setTimeout(() => {
          setErrorMessage("");
        }, 1000);
      }
    } else {
      personService.create(newPerson);
      setErrorMessage(`Added ${newPerson.name} `);
      setTimeout(() => {
        setErrorMessage("");
      }, 1000);
    }
    setNewName("");
    setNewNumber("");
  };

  //Delete person
  const handleDelete = (e) => {
    if (window.confirm(`Do you want to delete ${e.target.name}?`)) {
      console.log(e.target.value);
      console.log(e.target.name);
      personService.remove(e.target.value).then(() => {
        personService.getAll().then((returnedName) => {
          setPersons(returnedName);
        });
      });

      setErrorMessage(`Deleted ${e.target.name} `);
      setTimeout(() => {
        setErrorMessage("");
      }, 1000);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification errorMessage={errorMessage} />
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
