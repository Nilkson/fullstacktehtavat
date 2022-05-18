import { useState, useEffect } from 'react'
import axios from 'axios'

const Countries = (props) => {
  const { countries, filter } = props
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
        {countriestoShow.map(country => <li key={country.name.common}> {country.name.common}</li>)}
      </ul>
    )
  } else {
    const country = countriestoShow[0]
    console.log("kielet ",Object.values(country.languages));
    return (
      <div>
        <h3>{country.name.common}</h3>
        capital {country.capital}
        <br/>
        area {country.area}
        <h2>languages</h2>
        <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li> )}
        </ul>
        <img src={country.flags.png} alt={country.name.common, "flag"}></img>
      </div>
    )
  }

}

const App = () => {
  const [countries, setCountries] = useState([])

  const [newFilter, setNewFilter] = useState('')

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
      <Countries countries={countries} filter={newFilter} />
    </div>
  );
}

export default App;
