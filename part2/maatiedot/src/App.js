import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country }) => {

    return (
        <p>{country.name}</p>
    )
}

const FullCountry = ({ country }) => {
    
    return (
        <div>
            <h1>{country.name}</h1>

            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h2>languages</h2>
            <ul>
                {country.languages.map(language =>
                    <li key={language.iso639_1}>{language.name}</li>)}
            </ul>
            <img src={country.flag} alt='flag' width = {300} decoding = "sync" />
        </div>

    )
}

const Countries = (props) => {
    const countries = props.countries
    const finder = props.finder
    const setCountries = props.setCountries

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
    },[])

    if (countries === null) {
        return (
            <div>Loading...</div>
        )
    }

    const countriesToShow = false
        ? countries
        : countries.filter(country =>
            country.name.toLowerCase().includes(finder.toLowerCase()))

    if (countriesToShow.length > 10) {
        return (
            <div>Too many</div>
        )
    }

    if (countriesToShow.length > 1) {
        return (
            <div>
                {countriesToShow.map(country =>
                    <Country key={country.name} country={country} />)}
            </div>
        )
    }

    return (
        <div>{countriesToShow.map(country =>
            <FullCountry key={country.name} country={country} />)}
        </div>
    )

}



const App = () => {
    const [countries, setCountries] = useState(null)
    const [finder, setFinder] = useState('swi')

    const handleFinder = (event) => {
        console.log(event.target.value);

        setFinder(event.target.value)
    }


    

    return (
        <div>
            find countries <input
                value={finder}
                onChange={handleFinder}
            />
            <Countries finder = {finder} countries = {countries} setCountries = {setCountries}/>
        </div>
    )
}

export default App 