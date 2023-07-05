//Finish 2.19

import { useState, useEffect } from "react";

import CountryService from "./service/CountrieService";
import CountryDetails from "./components/CountryDetails";

function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");
  const [showCountry, setshowCountry] = useState({});

  useEffect(() => {
    CountryService.getCountries().then((response) => {
      setCountries(
        response.map(({ name, capital, area, languages, flags }) => ({
          name: name.common,
          capital,
          area,
          languages,
          flags,
        }))
      );
    });
  }, []);

  const handleChange = (e) => {
    setQuery(e.target.value);
    setshowCountry({});
  };

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleShow = (name) =>
    setshowCountry(
      filteredCountries.filter((country) => country.name.includes(name))[0]
    );
  return (
    <div>
      <p>
        find countries <input value={query} onChange={handleChange}></input>
      </p>
      {filteredCountries.length > 10 && (
        <div>Too many matches, specify another filter</div>
      )}
      {filteredCountries.length <= 10 &&
        filteredCountries.length > 1 &&
        filteredCountries.map((country) => (
          <div key={country.name}>
            {country.name}{" "}
            <button onClick={() => handleShow(country.name)}>show</button>
          </div>
        ))}
      {filteredCountries.length === 1 && (
        <CountryDetails country={filteredCountries[0]} />
      )}
      {showCountry.name && <CountryDetails country={showCountry} />}
    </div>
  );
}

export default App;
