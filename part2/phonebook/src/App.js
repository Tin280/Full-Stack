//////Finish 2.6-2.17
import { useState, useEffect } from "react";

import Filter from "./components/Filter";
import PersonsForm from "./components/PersonsForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personService from "./services/person";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterQuery, setfilterQuery] = useState("");
  const [status, setStatus] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    console.log("effect");
    personService.getAll().then((initialPersons) => {
      console.log("promise fulfilled");
      setPersons(initialPersons);
    });
  }, []);

  const handlechange = (setValue) => (event) => {
    console.log(event.target.value);
    setValue(event.target.value);
  };

  const handleAddNewPerson = (e) => {
    e.preventDefault();

    const newPerson = { name: newName, number: newNumber };
    const foundPerson = persons.find((person) => person.name === newName);

    if (foundPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(foundPerson.id, newPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== foundPerson.id ? person : returnedPerson
              )
            );
          })
          .catch((error) => {
            setStatus("error");
            setNotification(
              `Information of ${foundPerson.name} has already been removed from server`
            );
            setTimeout(() => {
              setStatus(null);
              setNotification(null);
            }, 5000);

            setPersons(
              persons.filter((person) => person.id !== foundPerson.id)
            );
          });
      }
    } else {
      personService.create(newPerson).then((addedPerson) => {
        setPersons(persons.concat(addedPerson));

        setStatus("success");
        setNotification(`Added ${addedPerson.name}`);
        setTimeout(() => {
          setStatus(null);
          setNotification(null);
        }, 5000);

        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handleRemovePerson = (id, name) => {
    return () => {
      if (window.confirm(`Delete ${name} ?`)) {
        personService
          .remove(id)
          .then(() => {
            setPersons(persons.filter((person) => person.name !== name));
            setNotification(`Removed ${name}`);
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            setPersons(persons.filter((n) => n.name !== name));
            setNotification(
              `User ${name} has already been removed from the server.`
            );
          });
        setTimeout(() => {
          setNotification(null);
        }, 10000);
      }
    };
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} status={status} />
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
