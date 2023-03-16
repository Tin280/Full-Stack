import Person from './Person'


const Persons = ({persons, query}) => (
<>
  {persons
    .filter(person => person.name.toLowerCase().includes(query))
    .map(({name, number}) => {
      return(
      <Person key={name} name={name} number={number} />
      )
    })
  }

</>
)

export default Persons