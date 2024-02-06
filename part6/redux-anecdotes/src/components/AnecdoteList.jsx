import { vote } from "../reducers/anecdoteReducer";
import { useDispatch, useSelector } from 'react-redux'
import { showNotification, hideNotification } from "../reducers/notificationReducer";
const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    console.log(anecdotes)
    const dispatch = useDispatch()
    const handleVote = (anecdote) => {
        dispatch(vote(anecdote.id))
        dispatch(showNotification(`You voted '${anecdote.content}'`))
        setTimeout(() => {
            dispatch(hideNotification(null))
        }, 5000);

    }
    const filter = useSelector(state => state.filters);
    let filteredAnec = anecdotes.filter(anec =>
        anec.content.toLowerCase().includes(filter)
    )
    return (
        <div>
            {
                filter === '' ?
                    (anecdotes).map(anecdote =>
                        <div key={anecdote.id}>
                            <div>
                                {anecdote.content}
                            </div>
                            <div>
                                has {anecdote.votes}
                                <button onClick={() => handleVote(anecdote)}>vote</button>
                            </div>
                        </div>
                    )
                    :
                    (filteredAnec).map(filteredAnec =>
                        <div key={filteredAnec.id}>
                            <div>
                                {filteredAnec.content}
                            </div>
                            <div>
                                has {filteredAnec.votes}
                                <button onClick={() => handleVote(filteredAnec)}>vote</button>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}

export default AnecdoteList