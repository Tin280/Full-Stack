import { createAnecdotes } from "../reducers/anecdoteReducer";
import { useDispatch } from 'react-redux'
import { hideNotification, showNotification } from "../reducers/notificationReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch()


  const newAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    console.log(content)
    event.target.anecdote.value = ''
    dispatch(createAnecdotes(content))
    dispatch(showNotification(`You create '${content}' `))
    setTimeout(() => {
      dispatch(hideNotification(null))
    }, 5000);
    dispatch(setNotification(`You create '${content}' `, 10))
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={newAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}


export default AnecdoteForm