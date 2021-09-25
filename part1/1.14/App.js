import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  const points = Array(anecdotes.length).fill(0)
  //   const points = {0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0}

  const [selected, setSelected] = useState(0)
  const [counter, setCounter] = useState(0)

  const [vote, setVote] = useState([...points])
  const [winID, setWinner] = useState(null)

  const randomJoke = () =>  {
        let index = Math.floor(Math.random() * anecdotes.length)
        setSelected(index)}

  const addVote = () => {
      vote[selected] += 1
      setVote(vote)
      setCounter(counter + 1)
      let winner = Math.max(...vote)
      let index = vote.indexOf(winner)
      setWinner(index)
        console.log(vote, winner, index)}


  return (
    <div>
        <h1>Anecdote of the day:</h1>
        <p>{anecdotes[selected]}</p>
        <Display value={vote[selected]} />
        <div>
            <Button onClick={addVote} text="vote"/>
            <Button onClick={randomJoke} text="Next funny word" />
        </div>
        <h1>Anecdote with most votes:</h1>
        <p>{anecdotes[winID]}</p>


    </div>
  )
}

export default App

const Display = props => <p>has {props.value} votes.</p>

const Button = ({onClick, text}) => {
  return (
        <button onClick={onClick}>
        {text}
        </button>
  )}


// const Addvote = ({vote, selected, setVote}) => {
//         vote[selected] += 1
//         return (
//             setVote(vote)
//         )}
