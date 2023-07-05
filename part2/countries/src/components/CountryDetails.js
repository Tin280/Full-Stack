const CountryDetails = ({ country }) => (
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
  </>
);

export default CountryDetails;
