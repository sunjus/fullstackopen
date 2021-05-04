import "./App.css";
import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [errorMsg, setErrorMsg] = useState({ msg: "", type: "" });

  useEffect(() => {
    //axios.get("http://localhost/3001/persons").then((res) => {
    //setPersons(res.data);
    personService.getAll().then((initialPhonebook) => {
      setPersons(initialPhonebook);
    });
    // });
  }, []);

  const message = (newMsg, newType) => {
    setErrorMsg({ msg: newMsg, type: newType });
    setTimeout(() => setErrorMsg({ msg: "", type: "" }), 5000);
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="App">
      <h1>Phonebook</h1>
      <Notification errorMsg={errorMsg} />
      <Filter handleFilter={handleFilter} filter={filter} />
      <PersonForm persons={persons} setPersons={setPersons} message={message} />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filter={filter}
        setPersons={setPersons}
        message={message}
      />
    </div>
  );
};

export default App;
