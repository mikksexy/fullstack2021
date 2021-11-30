import React, { useState, useEffect} from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const Countries = ({countries}) => {
  return (
    <div>
      {countries.map(country => {
        const { name, capital, population, languages, flags } = country
        return <div
          key={name}>
          <h2>{name}</h2>
          <div>capital {capital}</div>
          <div>population {population}</div>
          <h3>languages</h3>
          <ul>
          {languages.map((language) => {
            return (
              <li key={language.name}>{language.name}</li> 
            )
          })}
          </ul>
          <img src={flags.png} alt={name} />
          <Weather capital={capital}></Weather>
        </div>
      })}
    </div>
  )
}

const Weather = ({capital}) => {
  const [ weather, setWeather] = useState([])
  const weatherURL = 'http://api.weatherstack.com/current' +
  '?access_key=' + api_key +
  '&query=' + capital
  console.log(weatherURL)

  useEffect(() => {
    const axiosData = async () => {
      const response = await axios(weatherURL)
      setWeather(response.data)
    }
    axiosData()
  }, [weatherURL])
  console.log(weather)
  return (
    <div>
      <h2>Weather in {capital}</h2>
      <div>temperature {weather.current.temperature}</div>
      <img src={weather.current.weather_icons} alt={weather.current.weather_descriptions}></img>
      <div>wind {weather.current.wind_speed} mph direction {weather.current.wind_dir}</div>
    </div>
  )
}


const Country = (props) => {
  const filter = props.country.name
  return (
    <div>
    {filter}
    <button onClick={() => {props.setNewFilter(filter); props.showCountries()}}>show</button>
    </div>
  )
}


const Filter = (props) => {
  return (
    <div>
    find countries<input
        value={props.newFilter}
        onChange={props.handleFilterChange}
        />
    </div>
  )
}


const App = () => {
  const [ countries, setCountries] = useState([])
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    axios
    .get('https://restcountries.com/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])


  const handleFilterChange = (e) => {
    setNewFilter(e.target.value)
  }


  function showCountries () {
    const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()) === true)
    if (countriesToShow.length > 10) return(<div>Too many matches, specify another filter</div>)
    if (countriesToShow.length > 1) return (
      countriesToShow.map(country => <Country key={country.name} country={country} setNewFilter={setNewFilter} showCountries={showCountries}></Country> )
      )
    if (countriesToShow.length === 1)return (<Countries countries={countriesToShow} />)
  }


  return (
    <div>
      <Filter newFilter={newFilter}
        handleFilterChange={handleFilterChange}
      />
      {showCountries()}
    </div>
  )
}
export default App