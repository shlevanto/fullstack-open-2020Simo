import React from 'react'

const Person = ( {person, delPerson} ) => {
    return(
    <p>
        {person.name} {person.number} 
        <button onClick = {delPerson}>
            Delete
        </button> 
    </p>
    )
}

export default Person;