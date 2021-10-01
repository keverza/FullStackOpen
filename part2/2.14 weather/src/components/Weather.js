import React from "react";

const Weather = ({weather, capital}) => {

  // const iconurl = `http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`
  return (
    <div>
      {!weather ? (
        <p>...</p>
      ) : (
        <div>
          <h2>Weather in {capital}, timezone: {weather.timezone}</h2>
          <img src={`http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`} width='150'/>
          <p>{weather.current.weather[0].description}</p>
          <p>Temperature: {weather.current.temp} Celsius</p>
          <p>Wind: {weather.current.wind_speed} kmh</p>

        </div>
      )}
    </div>
  )
}


export default Weather