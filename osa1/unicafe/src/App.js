import { useState } from 'react'

const Display = (content) => {
  return (
    <p>{content.feedback} {content.amount}</p>
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
      <Display feedback={'good'} amount={good} />
      <Display feedback={'neutral'} amount={neutral} />
      <Display feedback={'bad'} amount={bad} />
    </div>
  )
}

export default App