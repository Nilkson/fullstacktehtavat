import { useState } from 'react'

const BestCurrentAnecdote = ({bestAnecdote}) => {
  if(bestAnecdote.votes === 0){
    return (
      <>
        No votes yet.
      </>
    )
  }

  return (
    <>
    {bestAnecdote.bestAnecdote} has {bestAnecdote.votes} votes
    </>
  )
}

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

  const [selected, setSelected] = useState(0)

  const points = Array(anecdotes.length).fill(0)
  const [items, setItems] = useState([...points])

  const [best, setBest] = useState({ bestAnecdote: 'null', votes: 0 })

  const setPoint = index => {
    setItems(existingItems => {
      return [
        ...existingItems.slice(0, index),
        existingItems[index] + 1,
        ...existingItems.slice(index + 1),
      ]
    })
    updateBestAnecdote()
  }

  const nextAnecdote = () => {
    updateBestAnecdote()
    if (selected >= anecdotes.length - 1) {
      setSelected(0)
    } else {
      setSelected(selected + 1)
    }
  }


  const updateBestAnecdote = () => {
    let bigValue = Math.max(...items)
    let bigIndex = items.indexOf(bigValue)
    setBest({bestAnecdote: anecdotes[bigIndex], votes: bigValue})
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {items[selected]} votes</p>
      <button onClick={nextAnecdote}>Next</button>
      <button onClick={() => setPoint(selected)}>Vote</button>

      <h2>Anecdote with most votes</h2>
      <BestCurrentAnecdote bestAnecdote={best} />
    </div>
  )
}

export default App