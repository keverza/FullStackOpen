import React from "react";
import Country from './Country'

const Result = ({countries, setFilterCountry}) => {

  if (countries.length === 1) {
    return (
      <div>
        {countries.map(country =>
          <Country
            setFilterCountry={setFilterCountry}
            key={country.name}
            showDetails={true}
            country={country}
          />
        )}
      </div>
    )
  } else {
    return (
      <div>
        {countries.length > 10 ? 'Too many matches, specify another filter' : countries.map(country =>
          <Country
            setFilterCountry={setFilterCountry}
            showDetails={false}
            key={country.name}
            country={country}
          />
        )}
      </div>
    )
  }
}
export default Result
