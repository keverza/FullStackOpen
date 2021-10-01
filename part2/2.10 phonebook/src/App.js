import React, {useState} from 'react'
import PersonForm from "./components/Personform"
import Person from "./components/Person"
import Filter from "./components/Filter"

const App = () => {
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas', number: '040-123456', id: 1},
    {name: 'Ada Lovelace', number: '39-44-5323523', id: 2},
    {name: 'Dan Abramov', number: '12-43-234345', id: 3},
    {name: 'Mary Poppendieck', number: '39-23-6423122', id: 4}
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterPerson, setFilterPerson] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  // const handleSearchChange = (event) => {
  //   setNewSearch(event.target.value)
  //   const result = persons.filter(item => item.name.toLowerCase().includes(newSearch))
  //
  //   setFoundNames()
  //   console.log(newSearch, result)
  //   return result  //
  // }

  const addName = (event) => {
    event.preventDefault()
    console.log('CLICK', event.target)
    const personObject = {
      name: newName,
      id: persons.length + 1,
      number: newNumber}

    const list = persons.map((item) => item.name)
    if (list.includes(newName)) {
      window.alert(`${newName} is already added to phonebook`)
      setNewName('')
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
      console.log(persons, list)
    }
  }

  const personsFilter = filterPerson
    ? persons.filter(person => person.name.toLowerCase().search(filterPerson.toLowerCase()) !== -1)
    : persons;

  const handleFilterChange = (event) => {
    setFilterPerson(event.target.value)
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
          />)}
      </ul>

      <h2>Search results</h2>

      <ul>
        {personsFilter.map(person =>
          <Person person={person}
                  key={person.id}
                  name={person.name}
                  number={person.number}
          />)}
      </ul>

    </div>
  )
}

export default App