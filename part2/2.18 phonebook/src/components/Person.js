import React from "react";

const Person = ({deleteContact, person}) => {
  return (
    <li className='person' key={person.id}>
      {person.name} {person.number} <button style={{borderRadius:'100%'}} onClick={() => deleteContact(person.id)}>del</button>
    </li>
  )
}

export default Person
