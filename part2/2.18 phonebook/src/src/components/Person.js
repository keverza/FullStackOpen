import React from "react";

const Person = ({person}) => {
  return (
    <li className='person' key={person.id}>
      {person.name} {person.number}
    </li>
  )
}

export default Person
