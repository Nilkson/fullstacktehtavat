import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
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
    //testi
    if (persons.find(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personToUpdate = persons.find(person => person.name === newName)
        console.log("update ", personToUpdate);
        personService
          .update(personToUpdate.id, personObject)
          .then(returnedPerson => {
            console.log(returnedPerson);
            const index = persons.findIndex(person => person.name === returnedPerson.name)
            const personsCopy = persons
            personsCopy[index] = returnedPerson
            console.log("persons list copy ", personsCopy);
            setPersons(personsCopy)
            setNewName("")
            setNewNumber("")
          })

      }
      return
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName("")
          setNewNumber("")
        })
    }

  }
  async function removePerson(id, name) {
    if (window.confirm(`Delete ${name}`)) {
      console.log("poistetaan id ", id);
      await personService
        .remove(id)
      console.log("delete succesfull");

      personService
        .getAll()
        .then(loadedPersons => {
          setPersons(loadedPersons)
          console.log(loadedPersons);
        })
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
      <PersonList personstoShow={personstoShow} onClick={removePerson} />
    </div>
  )

}

export default App