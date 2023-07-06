import { useState, useEffect } from "react";
import axios from "axios";

const CountryDetails = ({ country }) => {
  const [temperature, setTemperature] = useState(0);
  const [wind, setWind] = useState(0);
  const [icon, setIcon] = useState("");

  const temperatureInCelsius = (temperature - 273.15).toFixed(1);

  useEffect(() => {
    const API = process.env.REACT_APP_API_KEY;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${API}`
      )
      .then((response) => {
        setTemperature(response.data.main.temp);
        setWind(response.data.wind.speed);
        setIcon(response.data.weather[0].icon);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [country.capital]);
  return (
    <>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h2>languages:</h2>
      <ul>
        {Object.values(country.languages).map((languages, index) => (
          <li key={index}>{languages}</li>
        ))}
      </ul>
      <div>
        <img src={country.flags.png} alt={`${country.name} flag`} />
      </div>
      <div>Temperature: {temperatureInCelsius} Celcius</div>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={`Weather in ${country.name}`}
      />
      <div>wind {wind} m/s</div>
    </>
  );
};

export default CountryDetails;
