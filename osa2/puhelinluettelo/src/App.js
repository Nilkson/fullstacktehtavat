import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  console.log('render', persons.length, 'notes')

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
  //persons listan filtteröiminen, ei tee mitään jos filter kenttään ei ole kirjoitettu, testattava nimi ja haettava nimi muutetaan pieniksi kirjaimiksi ja suoriteen vertailu.
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