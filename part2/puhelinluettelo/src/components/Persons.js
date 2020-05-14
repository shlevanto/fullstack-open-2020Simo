import React from 'react';
import Person from './Person'


const Persons = ( {personsToShow, delPerson} ) => {
    return (
        <>    
        {personsToShow.map(person =>
        <Person 
            key = {person.name} 
            person = {person} 
            delPerson = {() => delPerson(person.id)}
        />
        )}
        </>
    )
}

export default Persons