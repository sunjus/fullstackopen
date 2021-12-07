import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

const Country = ({ country }) => {
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
      <Weather capital={country.capital} />
    </div>
  );
};

const Countries10 = ({ searchedCountries, setSearch }) => {
  return (
    <div>
      {searchedCountries.map((country, index) => (
        <div key={index}>
          {country.name}
          <button onClick={() => setSearch(country.name)}>show</button>
        </div>
      ))}
    </div>
  );
};

const Countries = ({ searchedCountries, setSearch }) => {
  if (searchedCountries.length === 1) {
    return <Country country={searchedCountries[0]} />;
  } else if (searchedCountries.length < 10 || searchedCountries.length > 1) {
    return (
      <Countries10
        searchedCountries={searchedCountries}
        setSearch={setSearch}
      />
    );
  }
  return <div>Too many matches, specify another filter</div>;
};

const Search = ({ handleInputSearch, search }) => {
  return (
    <div>
      find countries
      <input onChange={handleInputSearch} value={search} />
    </div>
  );
};

const api_key = process.env.REACT_APP_API_KEY;

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState("");

  const api = `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`;

  useEffect(() => {
    Axios.get(api).then((res) => {
      console.log(res.data);
      setWeather(res.data.current);
    });
  }, [api]);

  console.log(weather);

  return (
    <div>
      <h2>Weather in {capital} </h2>
      <p>
        <strong>temperature: </strong> {weather.temperature} Celsius{" "}
      </p>
      <img
        src={weather.weather_icons}
        alt="weather icon"
        style={{ widht: "100px", height: "100px" }}
      />
      <p>
        <strong>wind:</strong> {weather.wind_speed} mph direction{" "}
        {weather.wind_dir}
      </p>
    </div>
  );
};
function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    Axios.get("https://restcountries.com/v2/all").then((res) => {
      console.log(res.data);
      setCountries(res.data);
    });
  }, []);

  const handleInputSearch = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setSearch(e.target.value);
  };

  const searchedCountries =
    search === ""
      ? []
      : countries.filter((country) =>
          country.name.toLowerCase().includes(search.toLowerCase())
        );

  return (
    <div>
      <Search handleInputSearch={handleInputSearch} search={search} />
      <Countries setSearch={setSearch} searchedCountries={searchedCountries} />
    </div>
  );
}

export default App;
