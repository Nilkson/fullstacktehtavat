import { useState, useEffect } from 'react'
import './index.css'
import Notification from './components/Notification'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  //usestates for notifications and their type true=error false= normal notification, initialized as null to hide element
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(true)

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
    const personObject = {
      name: newName,
      number: newNumber
    }
    //check if person is already in the list by name
    if (persons.find(person => person.name === newName)) {

      const index = persons.findIndex(person => person.name === newName)
      //if name is in list, ask if user want to update the number associated to that name
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        console.log("update ", persons[index]);
        personService
          .update(persons[index].id, personObject)
          .then(updatedPerson => {

            // console.log(updatedPerson);
            // const personsCopy = persons
            // personsCopy[index] = updatedPerson
            // console.log("persons list copy ", personsCopy);
            // setPersons(personsCopy)

            //updates person list with result as code above i think?
            setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson))
            showFiveSecondMessage(`Updated ${updatedPerson.name}`, false)
            setNewName("")
            setNewNumber("")
          })
          .catch(error => {
            showFiveSecondMessage(`${newName} was already deleted from server`, true)
            setPersons(persons.filter(person => person.id !== persons[index].id))
          })

      }
      return
    } else {
      //if not add person to list
      personService
        .create(personObject)
        .then(addedPerson => {
          setPersons(persons.concat(addedPerson))
          showFiveSecondMessage(`Added ${addedPerson.name}`, false)
          setNewName("")
          setNewNumber("")
        })
    }

  }
  const showFiveSecondMessage = (message, messageType) => {
    console.log("isError ", messageType);
    setMessage(message)
    setIsError(messageType)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }
  async function removePerson(id, name) {
    if (window.confirm(`Delete ${name}`)) {
      console.log("poistetaan id ", id);
      await personService
        .remove(id)
        .then(response => {
          showFiveSecondMessage(`Removed ${name}`, false)
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          showFiveSecondMessage(`${name} was already removed`, true)
          setPersons(persons.filter(person => person.id !== id))
        })
      console.log("delete succesfull");

      // personService
      //   .getAll()
      //   .then(loadedPersons => {
      //     setPersons(loadedPersons)
      //     console.log(loadedPersons);
      //   })
    }

  }
  //persons list filtering, both name in list and filter input converted to lowercase for comparison
  const personstoShow = filter === ""
    ? persons
    : persons.filter(person => person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))


  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} isError={isError} />
      <Filter value={filter} onChange={handleFilterChange} />
      <PersonForm onClick={addPerson} numberValue={newNumber} nameValue={newName} onChangeNumber={handleNumberChange} onChangeName={handleNameChange} />
      <h2>Numbers</h2>
      <PersonList personstoShow={personstoShow} onClick={removePerson} />
    </div>
  )

}

export default App