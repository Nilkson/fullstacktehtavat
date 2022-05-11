import { useEffect, useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
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


  const [points, setPoints] = useState(new Uint8Array(7))
  const [selected, setSelected] = useState(0)
  const [mostPoints, setMostPoints] = useState(0)

  function addPoints() {
    console.log('indeksi ' + points);
    console.log('lista päivityksen jälkeen ' + points);
    setPoints(existingItems => {
      return [
        ...existingItems.slice(0, selected),
        existingItems[selected] + 1,
        ...existingItems.slice(selected + 1),
      ]
    })
    getMostPoints()
  }

  function getMostPoints() {
    const maxIndex = points.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
    console.log(maxIndex);
    setMostPoints(maxIndex)

  }

  return (
    <div>
      <h2>anectode of the day</h2>
      {anecdotes[selected]}
      <br></br>
      has {points[selected]} points
      <br />
      <button onClick={() => addPoints()}>vote</button>
      <Button handleClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))} text={'next anectode'} ></Button>
      <h2>anectode with the most votes</h2>
      {anecdotes[mostPoints]}
    </div>

  )
}

export default App