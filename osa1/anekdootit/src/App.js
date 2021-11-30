import React, { useState } from 'react'
var points = [0, 0, 0, 0, 0, 0, 0]

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  //var points = Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0)
  //const copy = [...points]
  
  function handleUpdate(index){
    var taulukko = [...points]
    taulukko[index] += 1
    //console.log(taulukko)
    points = taulukko
    console.log(points)
    return(points[index])
  }

  function handleSelected() {
    const selected = Math.floor(Math.random() * anecdotes.length)
    setPoints(points[selected])
    return selected
  }

  function mostVotes() {
    let max = points[0]
    let maxIndex = 0
      for (let index = 0; index < points.length; index++) {
        if (points[index] > max) {
          max = points[index]
          maxIndex = index
        }
      }
    return (
      anecdotes[maxIndex]
    )
  }
  
  const [selected, setSelected] = useState(0)
  const [point, setPoints] = useState(0)
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <div>has {point} votes</div>
      <Button handleClick={() => setPoints(handleUpdate(selected))} text='vote' />
      <Button handleClick={() => setSelected(handleSelected())} text='next anecdote' />
      <h1>Anecdote with most votes</h1>
      {mostVotes()}
    </div>
  )
}

export default App