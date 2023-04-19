import { useEffect, useState } from 'react';
import './App.css';
import personsService from './services/persons';

const PersonInfo = ({ person, handleDelete }) => (
  <p>
    {person.name} {person.number ?? 'No phone number'}
    <button onClick={() => handleDelete(person.id)}>Delete</button>
  </p>
);

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    personsService
      .getAll()
      .then((fetchedPersons) => setPersons(fetchedPersons));
  }, []);

  const handleDelete = (id) => {
    const confirmedText = `Delete ${
      persons.find((person) => person.id === id)?.name
    }?`;
    const userConfirmed = window.confirm(confirmedText);
    if (!userConfirmed) return;
    personsService.deletePerson(id).then(() => {
      setPersons(persons.filter((person) => person.id !== id));
    });
  };

  const personNames = persons?.map((person) => (
    <PersonInfo handleDelete={handleDelete} key={person.id} person={person} />
  ));

  const filteredPersonNames = persons
    ?.filter((person) => person.name.includes(filter))
    .map((person) => (
      <PersonInfo handleDelete={handleDelete} key={person.id} person={person} />
    ));

  const handleSubmit = (event) => {
    event.preventDefault();

    const userThatExists = persons.find((person) => person.name === newName);

    if (userThatExists) {
      const confirmedText = `${newName} is already added to phonebook, replace the old number with a new one?`;

      const userConfirmed = window.confirm(confirmedText);

      if (!userConfirmed) return;

      personsService
        .update(userThatExists.id, { ...userThatExists, number: newPhone })
        .then((updatedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== updatedPerson.id ? person : updatedPerson
            )
          );
        });
    } else {
      const personObject = {
        name: newName,
        number: newPhone,
      };

      personsService
        .create(personObject)
        .then((returnedPerson) => setPersons(persons.concat(returnedPerson)));
    }

    setNewName('');
    setNewPhone('');
  };

  return (
    <div className="app">
      <h2>Phonebook</h2>
      <div>
        filter shown with:{' '}
        <input
          type="text"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          name:{' '}
          <input
            type="text"
            required
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          />
        </div>
        <div>
          number:{' '}
          <input
            type="tel"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            value={newPhone}
            required
            onChange={(event) => setNewPhone(event.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filter ? filteredPersonNames : personNames}
    </div>
  );
};

export default App;
