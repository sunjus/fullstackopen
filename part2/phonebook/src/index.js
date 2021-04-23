import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchNameExist, setSearchNameExist] = useState("");

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

  const searchPerson = persons.filter((p) =>
    p.name.toLowerCase().includes(searchNameExist.toLowerCase())
  );
  console.log(searchPerson);

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with
        <input
          value={searchNameExist}
          onChange={(e) => setSearchNameExist(e.target.value)}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <h3>Add a new</h3>
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
      <h3>Numbers</h3>
      <ul>
        {searchPerson.map((p, i) => (
          <div key={i}>
            {p.name}
            {p.number}
          </div>
        ))}
      </ul>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
