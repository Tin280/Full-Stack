import Person from "./Person";

const Persons = ({ persons, query }) => (
  <>
    {persons
      .filter(
        (person) =>
          person && person.name && person.name.toLowerCase().includes(query)
      )
      .map(({ name, number }) => (
        <Person key={name} name={name} number={number} />
      ))}
  </>
);

export default Persons;
