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
      .catch((error) => {
        console.log("fail");
      });
  }, []);

  //Filter section :Check if the name already exists in the phonebook
  const handleFilterChange = (e) => {
    setFilteredPersons(
      persons.filter((p) =>
        p.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  //Add new person
  const addPerson = (e) => {
    e.preventDefault();
    const newPerson = { name: newName, number: newNumber };

    //Alarm if the input name exists
    const checkedName = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    if (checkedName) {
      return alert(`${newName} is already added to phonebook`);
    }

    //Add a new person
    personService
      .create(newPerson)
      .then((returnedPhonebook) => {
        setPersons(persons.concat(returnedPhonebook));
        // setPersons([...persons, newPerson]);
        setNewName("");
        setNewNumber("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Delete person
  const handleDelete = (e) => {
    if (window.confirm(`Do you want to delete ${e.target.name}?`)) {
      console.log(e.target.value);
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
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
