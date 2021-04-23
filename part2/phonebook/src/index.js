import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
  ]);
  console.log(persons[0]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNameInput = (e) => {
    console.log(e.target.value);
    setNewName(e.target.value);
  };

  const handleNumberInput = (e) => {
    console.log(e.target.value);
    setNewNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPerson = { name: newName, number: newNumber };

    const nameExist = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    if (nameExist) {
      return alert(`${newName} is already added to phonebook`);
    }

    setPersons([...persons, newPerson]);
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameInput} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberInput} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person, index) => (
          <div key={index}>
            {person.name}
            {person.number}
          </div>
        ))}
      </ul>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
