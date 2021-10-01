import React, {useState, useEffect} from 'react'
import axios from 'axios'

import Result from "./components/Result"
import Filter from "./components/Filter"
// const url="https://api.openweathermap.org/data/2.5/onecall"
// const api_call = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}"


const App = () => {
  const [countries, setCountries] = useState([])
  const [filterCountry, setFilterCountry] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])


  const countryFilter = filterCountry
    ? countries.filter(country => country.name.toLowerCase().includes(filterCountry.toLowerCase()))
    : countries;

  const handleFilterChange = (event) => {
    setFilterCountry(event.target.value)
  }

  return (
    <div>
      <h2>Country</h2>
      <Filter value={filterCountry} onChange={handleFilterChange}/>
      <h2>Search results</h2>
      <div>
        <Result countries={countryFilter} setFilterCountry={(filter) => setFilterCountry(filter)}/>
      </div>

    </div>
  )
}

export default App