import React, {useState, useEffect} from "react";
import Weather from "./Weather";
import axios from "axios"

const Country = ({country, showDetails, setFilterCountry}) => {
  const [weather, setWeather] = useState(null)
  const capital = country.capital
  const latlng = country.latlng
  const url="https://api.openweathermap.org/data/2.5/onecall"

  useEffect(() =>{
    const api_key = process.env.REACT_APP_OPENWEATHER;
    axios
      .get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latlng[0]}&lon=${latlng[1]}&units=metric&exclude=minutely,hourly,daily,alerts&appid=${api_key}`)
      .then((response) => setWeather(response.data))
  }, [latlng]);

  const handleClick = () => {
    setFilterCountry(country.name)
  }

  if (showDetails) {
    return (
      <div>
        <h1>{country.name}</h1>
        <div>capital: {capital} </div>
        <div>population: {country.population}</div>
        <h2>languages:</h2>
        <ul>
          {country.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
        </ul>
        <img src={country.flag} width='150'/>

        <Weather weather={weather} capital={capital} />


      </div>
    )
  } else {
    return (
      <div>
        {country.name}
        <button onClick={handleClick}>show</button>
      </div>
    )
  }
}

export default Country