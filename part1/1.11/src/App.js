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
        <h1>Statistics</h1>
        <table><Statistics good={good} bad={bad} neutral={neutral}  /></table>

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
    if (total === 0) {
        return (
            <div>
            <p>No feedback was given</p>
            </div>
        )}
    return (

      <tbody>
          <StatisticLine text="good" value ={good} />
          <StatisticLine text="neutral" value ={neutral} />
          <StatisticLine text="bad" value ={bad} />
          <StatisticLine text="total" value ={total} />
          <StatisticLine text="average" value ={(good - bad) / total} />
          <StatisticLine text="positive" value ={good / total * 100} />
      </tbody>
    )}
const StatisticLine = ({text, value}) => {
    if (text === 'positive') {
        return (
        <tr>
            <td>{text}</td>
            <td>{value} %</td>
        </tr>
        )}

    return (

        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )}