import { createSlice } from "@reduxjs/toolkit"
/* eslint-disable no-case-declarations */
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

// const anecdoteSlice = (state = initialState, action) => {
//   console.log('state now: ', state)
//   console.log('action', action)
//   switch (action.type) {
//     case "voteAnecdote":
//       const id = action.id
//       const increaseVote = state.find((a) => a.id === id)
//       const changeVote = { ...increaseVote, votes: increaseVote.votes + 1 }
//       const newState = state.map((a) => (a.id === id ? changeVote : a))
//       return newState.sort((a, b) => b.votes - a.votes)

//     case "addAnecdote":
//       return [...state, action.payload]
//     default:
//       return state
//   }

// }

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState,
  reducers: {

    voteAnecdote(state, action) {
      console.log('state now: ', state)
      console.log('action', action)
      const id = action.payload.id
      const increaseVote = state.find((a) => a.id === id)
      const changeVote = { ...increaseVote, votes: increaseVote.votes + 1 }
      const newState = state.map((a) => (a.id === id ? changeVote : a))
      return newState.sort((a, b) => b.votes - a.votes)
    },
    addAnecdote(state, action) {
      console.log('state now: ', state)
      console.log('action', action)
      return [...state, action.payload]

    }

  },
})

export const { voteAnecdote, addAnecdote } = anecdoteSlice.actions


export const create = (content) => {
  return addAnecdote({
    content,
    id: getId(),
    votes: 0

  })
}


export const vote = (id) => {
  return voteAnecdote({
    type: "voteAnecdote",
    id
  }
  )
}

export default anecdoteSlice.reducer