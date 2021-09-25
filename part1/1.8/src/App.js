import React, { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>Give feedback</h1>
        <Button onClick={increaseGood} text='Good'/>
        <Button onClick={increaseNeutral} text='Neutral'/>
        <Button onClick={increaseBad} text='Bad'/>
        <Statistics good={good} bad={bad} neutral={neutral}  />




    </div>
  )
}

export default App

const Button = ({onClick, text}) => {

  return (
    <button onClick={onClick}>
        {text}
    </button>
  )
}

const Statistics = ({good, neutral, bad}) => {
    const total = bad + neutral + good

    return (
        <>
        <h1>Statistics</h1>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>Total {total}</p>
        <p>Average {(good - bad) / (total)}</p>
        <p>Percentage { good / (total) * 100} %</p>
        </>
    )

}
