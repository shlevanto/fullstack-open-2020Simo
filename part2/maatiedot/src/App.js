import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country, handleShow, show, setCountries }) => {
    if (show) {
        setCountries(country)

        return (
            <><FullCountry country = {country}/></>
        )
    }

    return (
        <p>{country.name} <button onClick = {handleShow()}>show</button></p>
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
            <h2>Weather in {country.capital}</h2>
            <Weather capital = {country.capital}/>
        </div>

    )
}

const Countries = (props) => {
    const countries = props.countries
    const handleShow = props.handleShow
    const show = props.show
    const setCountries = props.setCountries

    if (countries === null) {
        return (
            <div>Loading...</div>
        )
    }
   
    if (countries.length > 10) {
        return (
            <div>Too many</div>
        )
    }

    if (countries.length > 1) {
        
        return (
            <div>
                {countries.map(country =>
                    <Country key={country.name} country={country} handleShow = {() => handleShow} show = {show} setCountries = {() => setCountries} />)}
            </div>
        )
    }

    return (
        <div>{countries.map(country =>
            <FullCountry key={country.name} country={country} />)}
        </div>
    )

}
const Weather = (props) => {
    const location = props.capital 
    console.log(location);
    
    
    const [weather, setWeather] = useState(null)
    
 
    useEffect(() => {
        axios
        .get('http://api.weatherstack.com/current',{
            params: {
                access_key: process.env.REACT_APP_WEATHER,
                query: location,
                units: 'm'
            }
        })
        .then(response  => {
            setWeather(response.data.current)
        })
    },[])
    
    
    if (weather === null) {
        return (
            <p>Loading...</p>
        )
    }
    
    console.log(weather.observation_time);
    
    return (
        <div>
            <WeatherInfo weather = {weather}/>
        </div>
    )
    

}

const WeatherInfo = ({weather}) => {
    
    return (
        <div>
        <p><b>temperature:</b> {weather.temperature} Celsius</p>
        <p><b>wind: </b> {weather.wind_speed} kmh direction {weather.wind_dir}</p>
        <img src = {weather.weather_icons} alt = 'weather icon' width = {100}/> 
        </div>
    )
} 


const App = () => {
    const [countries, setCountries] = useState(null)
    const [finder, setFinder] = useState('')
    const [show, setShow] = useState(false)
    let countriesToShow = null
    
        useEffect(() => {

        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
    },[])
    
    if (countries !== null) {
        countriesToShow = false
        ? countries
        : countries.filter(country =>
        country.name.toLowerCase().includes(finder.toLowerCase()))
        }

    const handleFinder = (event) => {
        console.log(event.target.value);

        setFinder(event.target.value)
    }

    const handleShow = () => {
        setShow(!show)
        console.log('Show must go on', show)
        
    }
    
    console.log(countries)
    
    return (
        <div>
            find countries <input
                value={finder}
                onChange={handleFinder}
            />
            <Countries finder = {finder} countries = {countriesToShow} setCountries = {setCountries} handleShow = {handleShow} show = {show}/>
        </div>
    )
}

export default App 