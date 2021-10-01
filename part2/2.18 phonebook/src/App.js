import React, {useState, useEffect} from 'react'
import PersonForm from "./components/Personform"
import Person from "./components/Person"
import Filter from "./components/Filter"
import bookService from './services/bookService'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterPerson, setFilterPerson] = useState('')

  //import data from server
  useEffect(() => {
    bookService
      .getAll()
      .then(initialContacts => {
        setPersons(initialContacts)
      })
  }, [])


  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    console.log('CLICK', event.target)
    const personObject = {
      name: newName,
      id: persons.length + 1,
      number: newNumber
    }

    const contactExists = persons.find(person => person.name === newName)
    if (contactExists) {
      if (window.confirm(`${newName} is already added to phonebook would like to update information`)) {
        bookService
          .update(contactExists.id, personObject)
          .then(updated => {setPersons(persons.map(pers => pers.id === updated.id ? updated : pers))})
          .catch(error =>{
            console.log(error)
          })
      }

    } else {
      bookService
        .create(personObject)
        .then(returnedContact => {
          setPersons(persons.concat(returnedContact))
          setNewName('')
        })

    }
    setNewName('')
    setNewNumber('')
  }

  const personsFilter = filterPerson
    ? persons.filter(person => person.name.toLowerCase().search(filterPerson.toLowerCase()) !== -1)
    : persons;

  const handleFilterChange = (event) => {
    setFilterPerson(event.target.value)
  }

  const deleteContact = (id) => {
    console.log('delete')
    if (window.confirm(`Please confirm deletion of ${persons.find((person) => person.id === id).name}`)) {
      bookService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id))
        })
        .catch((error) => alert(error))
    } else {
      return
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterPerson} onChange={handleFilterChange}/>
      <h2>Add new contact</h2>

      <PersonForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />


      <h2>Numbers</h2>
      <ul>
        {persons.map((person) =>
          <Person person={person}
                  key={person.id}
                  name={person.name}
                  number={person.number}
                  deleteContact={deleteContact}
          />)}
      </ul>

      <h2>Search results</h2>

      <ul>
        {personsFilter.map(person =>
          <Person person={person}
                  key={person.id}
                  name={person.name}
                  number={person.number}
                  deleteContact={deleteContact}

          />)}
      </ul>

    </div>
  )
}

export default App