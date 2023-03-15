import { useState } from 'react'
//Finish 2.6-2.9
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterQuery, setfilterQuery] = useState('')

  const handlechange = setValue => (event) => {
    console.log(event.target.value)
    setValue(event.target.value)
  }

  const handleAddNewPerson = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    if (persons.find(person => person.number === newNumber))
      alert(`${newNumber} is alredy added to phonebook`)
    else {
      const newPerson = { name: newName, number: newNumber }

      setPersons(persons.concat(newPerson))

      setNewName('')
      setNewNumber('')
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <p>
        filter shown with<input value={filterQuery} onChange={handlechange(setfilterQuery)} />
      </p>
      <form ></form>
      <h2>add a new</h2>
      <form onSubmit={handleAddNewPerson}>
        <div>
          name: <input value={newName} onChange={handlechange(setNewName)} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handlechange(setNewNumber)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.filter(person => person.name.toLocaleLowerCase().includes(filterQuery))
        .map(person => (
          <div key={person.name}>{person.name} {person.number}</div>
        ))}
    </div>
  )
}

export default App