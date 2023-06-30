//////Finish 2.6-2.14
import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonsForm from "./components/PersonsForm";
import Persons from "./components/Persons";
import person from "./services/person";
function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterQuery, setfilterQuery] = useState("");
  useEffect(() => {
    console.log("effect");
    person.getAll().then((initialPersons) => {
      console.log("promise fulfilled");
      setPersons(initialPersons);
    });
  }, []);

  const handlechange = (setValue) => (event) => {
    console.log(event.target.value);
    setValue(event.target.value);
  };
  const foundPerson = () => {};
  const handleAddNewPerson = (event) => {
    event.preventDefault();
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = { name: newName, number: newNumber };
      person.create(newPerson).then((addedPerson) => {
        setPersons(persons.concat(addedPerson));

        setNewName("");
        setNewNumber("");
      });
    }
  };
  const handleRemovePerson = (id, name) => () => {
    if (window.confirm(`Delete ${name}?`)) {
      person.remove(id).then((deletedPerson) => {
        setPersons(
          persons.filter((person) => person.name !== deletedPerson.name)
        );
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter query={filterQuery} handlechange={handlechange(setfilterQuery)} />
      <h2>add a new</h2>
      <PersonsForm
        newNumber={newNumber}
        newName={newName}
        handlechangeName={handlechange(setNewName)}
        handlechangeNumber={handlechange(setNewNumber)}
        handleAddPerson={handleAddNewPerson}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        query={filterQuery}
        handleRemovePerson={handleRemovePerson}
      />
    </div>
  );
}
export default App;
