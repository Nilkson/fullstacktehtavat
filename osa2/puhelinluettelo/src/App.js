import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState("")

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName("")
      setNewNumber("")
    }

  }

  const personstoShow = filter === ""
    ? persons
    : persons.filter(person => person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))

  // console.log(persons[0].name.toLocaleLowerCase().includes(filter));
  // console.log("vertailu", persons[0].name.localeCompare(filter, 'sv', { sensitivity: 'accent' }));

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    // console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <PersonForm onClick={addPerson} numberValue={newNumber} nameValue={newName} onChangeNumber={handleNumberChange} onChangeName={handleNameChange} />
      <h2>Numbers</h2>
      <Persons personstoShow={personstoShow} />
    </div>
  )

}

export default App