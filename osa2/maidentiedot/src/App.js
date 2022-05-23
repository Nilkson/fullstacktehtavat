import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const Button = (props) => {
  const { country, setNewFilter, text } = props
  return (
    <button onClick={() => setNewFilter(country)}>{text}</button>
  )
}
const Weather = (props) => {
  const [weatherData, setweatherData] = useState([])
  const { country } = props

  useEffect(() => {
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&APPID=${api_key}`)
      .then(response => {
        console.log("promise fulfilled");
        setweatherData(response.data)
        console.log("response data ", response.data);
      })
  }, [])
  console.log("säädata ", weatherData);

  if (weatherData.length === 0) {
    return
  } else {
    console.log("sääikoni id ", weatherData.weather[0].icon);
    return (
      <div>
        <h1>Weather in {country.capital}</h1>
        temperature {weatherData.main.temp} Celsius
        <div>
          <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather.description}></img>
        </div>
        wind {weatherData.wind.speed} m/s
      </div>
    )
  }

}

const Countries = (props) => {
  const { countries, filter, setNewFilter } = props
  console.log('filtteri ', filter);
  const countriestoShow = filter === ""
    ? countries
    : countries.filter(countries => countries.name.common.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
  console.log('filtered ', countriestoShow);

  if (countriestoShow.length === 0) {
    return
  }
  if (countriestoShow.length > 10) {
    return (
      <p>Too many matches, please specify another filter</p>
    )
  } else if (countriestoShow.length <= 10 && countriestoShow.length > 1) {
    return (
      <ul>
        {countriestoShow.map(country => <li key={country.name.common}> {country.name.common} <Button text={"show"} country={country.name.common} setNewFilter={setNewFilter}></Button></li>)}
      </ul>
    )
  } else {
    const country = countriestoShow[0]
    console.log("kielet ", Object.values(country.languages));
    return (
      <div>
        <h1>{country.name.common}</h1>
        capital {country.capital}
        <br />
        area {country.area}
        <h2>languages</h2>
        <ul>
          {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
        </ul>
        <img src={country.flags.png} alt={country.name.common, "flag"}></img>
        <Weather country={country} />
      </div>
    )
  }

}

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')


  console.log("api ", api_key);

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
        console.log(response.data)
        console.log('maa lista ', countries)
        // console.log('eka listassa', countries[0].name.common)
      })
  }, [])

  const handleFilterChange = (event) => {
    console.log(newFilter);
    setNewFilter(event.target.value)
  }

  return (
    <div className="App">
      find countries <input value={newFilter} onChange={handleFilterChange} />
      <Countries countries={countries} filter={newFilter} setNewFilter={setNewFilter} />
    </div>
  );
}

export default App;
