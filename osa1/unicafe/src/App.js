import React, { useState } from 'react'

const Statistics = (props) => {
  const { good, neutral, bad } = props
  if (good===0 && neutral===0 && bad===0) return <div>No feedback given</div>
  
  return (
  <table>
    <StatisticLine text="good" value = {good}/>
    <StatisticLine text="neutral" value = {neutral}/>
    <StatisticLine text="bad" value = {bad}/>
    <StatisticLine text="all" value = {good + neutral + bad}/>
    <StatisticLine text="average" value = {(good + (neutral * 0) + (bad * -1)) / (good + neutral + bad)}/>
    <StatisticLine text="positive" value = {good / (good + neutral + bad) * 100} />
  </table>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, value }) => {
  if (text==="positive") return (
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{value} %</td>
      </tr>
    </tbody>
  )
  return (
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </tbody>
)
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App