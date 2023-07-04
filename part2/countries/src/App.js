//Finish 2.18

import { useState, useEffect } from "react";

import CountryService from "./service/CountrieService";

function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");
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

  // console.log(countries);

  const handleChange = (e) => setQuery(e.target.value);

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div>
      <p>
        find countries <input value={query} onChange={handleChange}></input>
      </p>
      {filteredCountries.length > 10 && (
        <div>Too many matches, specify another filter</div>
      )}
      {filteredCountries.length < 10 &&
        filteredCountries.length < 1 &&
        filteredCountries.map((country) => (
          <div key={country.name}>{country.name}</div>
        ))}
      {filteredCountries.length === 1 && (
        <>
          <h1>{filteredCountries[0].name}</h1>
          <div>capital {filteredCountries[0].capital}</div>
          <div>area {filteredCountries[0].area}</div>
          <h2>languages:</h2>
          <ul>
            {Object.values(filteredCountries[0].languages).map(
              (languages, index) => (
                <li key={index}>{languages}</li>
              )
            )}
          </ul>
          <div>
            <>{console.log(filteredCountries[0].flag)}</>
            <img
              src={filteredCountries[0].flags.png}
              alt={`${filteredCountries[0].name} flag`}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
