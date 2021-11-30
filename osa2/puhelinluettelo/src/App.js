import React, { useState, useEffect} from 'react'
import personService from './services/persons'
import './index.css'

const Persons = (props) => {
  return (
    <div>
      {props.persons.map(person =>
        <Person key={person.name} person={person} removePerson={props.removePerson} />
      )}
    </div>
  )
}

const Person = (props) => {
  return (
    <div>
    {props.person.name} {props.person.number} 
    <button onClick={() => props.removePerson(props.person)}>delete</button>
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
        <div>
          name: <input
            value={props.newName}
            onChange={props.handleNameChange}
          />
        </div>
        <div>
          number: <input
            value={props.newNumber}
            onChange={props.handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Filter = (props) => {
  return (
    <div>
    filter shown with<input
        value={props.newFilter}
        onChange={props.handleFilterChange}
        />
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  if (message.includes('Information')) {
    return (
      <div className="error">
        {message}
      </div>
    )
  }
  return (
    <div className="success">
      {message}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)
  

  useEffect(() => {
    personService
    .getAll()
    .then(response => {
      setPersons(response)
    })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (newName === '') return
    if (persons.some(e => e.name === newName) === true) {
      const existingId = persons.find(name => name.name === newName).id
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`) === false) return
      personService
      .update(existingId, newName, newNumber)
      .then(response => {
        setPersons(persons.map(person => person.id !== existingId ? person : response))
        setErrorMessage(`Updated ${newName}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      })
      .catch(error => {
        setErrorMessage(`Information of ${newName} has already been removed from the server`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setPersons(persons.filter(p => p.id !== existingId))
    })
      return
    }
    personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
        setErrorMessage(`Added ${personObject.name}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      })
  }

  const removePerson = (person) => {
      if (window.confirm(`Delete ${person.name} ?`) === false) return
      personService
      .remove(person.id)
      .then(response => {
        setPersons(persons.filter(pe => pe.id !== person.id))
        setErrorMessage(`Removed ${person.name}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      })
      
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterChange = (e) => {
    setNewFilter(e.target.value)
  }

  const personsToShow = persons
  ? persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()) === true)
  : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter newFilter={newFilter}
        handleFilterChange={handleFilterChange}
      />
      <h3>add a new</h3>
      <PersonForm handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow}
      removePerson={removePerson} 
      />
    </div>
  )

}

export default App