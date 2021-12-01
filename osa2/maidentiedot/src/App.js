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
          <h3>Spoken languages</h3>
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
      setWeather({
      temp: response.data.current.temperature,
      icons: response.data.current.weather_icons,
      descp: response.data.current.weather_descriptions,
      speed: response.data.current.wind_speed,
      dir: response.data.current.wind_dir
    })
    }
    axiosData()
  }, [weatherURL])

  console.log(weather)
  return (
    <div>
      <h3>Weather in {capital}</h3>
      <div><b>temperature: </b> {weather.temp} Celcius</div>
      <img src={weather.icons} alt={weather.descp}></img>
      <div><b>wind:</b> {weather.speed} mph direction {weather.dir}</div>
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