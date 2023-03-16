//Finish 2.6-2.10

import { useState } from "react";
import Filter from "./components/Filter";
import PersonsForm from "./components/PersonsForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterQuery, setfilterQuery] = useState("");

  const handlechange = (setValue) => (event) => {
    console.log(event.target.value);
    setValue(event.target.value);
  };

  const handleAddNewPerson = (event) => {
    event.preventDefault();
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    }
    if (persons.find((person) => person.number === newNumber))
      alert(`${newNumber} is alredy added to phonebook`);
    else {
      const newPerson = { name: newName, number: newNumber };

      setPersons(persons.concat(newPerson));

      setNewName("");
      setNewNumber("");
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
      <Persons persons={persons} query={filterQuery} />
    </div>
  );
};

export default App;
