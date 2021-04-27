import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

const Search = ({ handleSearch, query }) => (
  <form>
    <input onChange={handleSearch} value={query} />
  </form>
);

const Result10 = ({ filteredList }) => {
  return (
    <div>
      {filteredList.map((country, i) => (
        <p key={i}>{country.name}</p>
      ))}
    </div>
  );
};

const Result1 = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital {country.capital}</p>
      <p>Population {country.population} </p>

      <h3>languages</h3>
      <ul>
        {country.languages.map((language) => (
          <li key={country.name + language.name}>{language.name}</li>
        ))}
      </ul>
      <img
        src={country.flag}
        alt={country.name}
        style={{ width: 120, height: 120 }}
      />
    </div>
  );
};

const ResultMaster = ({ filteredList }) => {
  if (filteredList.length === 1) {
    return <Result1 country={filteredList[0]} />;
  } else if (filteredList.length < 10) {
    return <Result10 filteredList={filteredList} />;
  }
  return <div>Too many matches, specify another filter</div>;
};

/*
const Result = ({ countries, query }) => {
  const filteredList =
    query === ""
      ? []
      : countries.filter((c) =>
          c.name.toLowerCase().includes(query.toLowerCase())
        );
  console.log(filteredList);

if (filteredList.length > 10) {
  return <div>Too many matches, specify another filter</div>;
}

if (filteredList.length === 1) {
  let Country = filteredList[0];
  return (
    <div>
      <h1>{Country.name}</h1>
      <p>Capital {Country.capital}</p>
      <p>Population {Country.population} </p>

      <h3>languages</h3>
      <ul>
        {Country.languages.map((language) => (
          <li key={Country.name + language.name}>{language.name}</li>
        ))}
      </ul>
      <img
        src={Country.flag}
        alt={Country.name}
        style={{ width: 120, height: 120 }}
      />
    </div>
  );
}

if (filteredList.length > 1) {
  return (
    <div>
      {filteredList.map((country, i) => (
        <p key={i}>{country.name}</p>
      ))}
    </div>
  );

  return <></>;
};

*/
function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((res) => {
      console.log(res.data);
      setCountries(res.data);
    });
  }, []);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const filteredList =
    query === ""
      ? []
      : countries.filter((c) =>
          c.name.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div className="App">
      <div>
        find countries
        <Search query={query} handleSearch={handleSearch} />
        <ResultMaster filteredList={filteredList} />
      </div>
    </div>
  );
}

export default App;
