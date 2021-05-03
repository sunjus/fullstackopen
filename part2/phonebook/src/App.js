import React, { useState, useEffect } from "react";
import personService from "./services/personService";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Person";
import Notification from "./components/Notification";

const App = () => {
  const [filteredPerson, setFilteredPerson] = useState("");
  const [persons, setPersons] = useState([]);
  const [message, setMessage] = useState({ msg: "", type: "" });

  useEffect(() => {
    personService.getAll().then((initialPhonebook) => {
      setPersons(initialPhonebook);
    });
  }, []);

  const notice = (newMsg, newType) => {
    setMessage({ msg: newMsg, type: newType });
    setTimeout(() => setMessage({ msg: "", type: "" }), 5000);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter
        filteredPerson={filteredPerson}
        setFilteredPerson={setFilteredPerson}
      />
      <h3>Add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} notice={notice} />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        filteredPerson={filteredPerson}
        setPersons={setPersons}
        notice={notice}
      />
    </div>
  );
};

export default App;
