import { useState } from 'react'
//Finish 2.6-2.8
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' , number: "03456-01328"}
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


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
      <form onSubmit={handleAddNewPerson}>
        <div>
          name: <input value={newName} onChange={handlechange(setNewName)} />
        </div>
        <div>
          number: <input value= {newNumber} onChange={handlechange(setNewNumber)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => (
        <div key={person.name}>{person.name} {person.number}</div>
      ))}
    </div>
  )
}

export default App