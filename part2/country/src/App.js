import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

const Search = ({ handleSearch, query }) => (
  <form>
    <input onChange={handleSearch} value={query} />
  </form>
);

const Result10 = ({ filteredList, setQuery }) => {
  return (
    <div>
      {filteredList.map((country, i) => (
        <div key={i}>
          {country.name}
          <button onClick={() => setQuery(country.name)}>show</button>
        </div>
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

const ResultMaster = ({ filteredList, setQuery }) => {
  if (filteredList.length === 1) {
    return <Result1 country={filteredList[0]} />;
    //fixed err to specify strict range : added filteredList length > 1
    //so that the setQuery works well
  } else if (filteredList.length < 10 || filteredList.length > 1) {
    return <Result10 filteredList={filteredList} setQuery={setQuery} />;
  }
  return <div>Too many matches, specify another filter</div>;
};

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
        <ResultMaster filteredList={filteredList} setQuery={setQuery} />
      </div>
    </div>
  );
}

export default App;
