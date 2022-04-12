import { useState } from 'react'

const Statistics = (statistics) => {
  var good = statistics.good;
  var neutral = statistics.neutral;
  var bad = statistics.bad;
  console.log(statistics.good + statistics.bad + statistics.neutral);
  
  if (statistics.good + statistics.bad + statistics.neutral === 0) {
    return (
      <p>No feedback given</p>
    )

  }
  return (
    <div>
    <p>good {good}</p>
    <p>neutral {neutral}</p>
    <p>bad {bad}</p>
    <p>all {statistics.good}</p>
    <p>average {(good - bad) / (good + neutral + bad)}</p>
    <p>positive {(good / (good + neutral + bad)) * 100}%</p>
    </div>

  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)
const Header = (text) => {
  return (
    <h1>{text.text}</h1>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const headers = [
    'give feedback',
    'statistics'
  ]

  return (
    <div>
      <Header text={headers[0]} />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Header text={headers[1]} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App