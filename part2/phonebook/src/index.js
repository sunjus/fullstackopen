import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas" },
    { name: "Ada Lovelace" },
  ]);
  console.log(persons[0]);

  const [newName, setNewName] = useState("");

  const handleNameInput = (e) => {
    console.log(e.target.value);
    setNewName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPerson = { name: newName };
    setPersons([...persons, newPerson]);
    setNewName("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameInput} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person, index) => (
          <div key={index}>{person.name}</div>
        ))}
      </ul>
      <div> {}</div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
