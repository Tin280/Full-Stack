import { vote } from "../reducers/anecdoteReducer";
import { useDispatch, useSelector } from 'react-redux'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()
    const handleVote = (id) => {
        console.log('vote', id)
        dispatch(vote(id))
    }
    const filter = useSelector(state => state.filters);
    let filteredAnec = anecdotes.filter(anec =>
        anec.content.toLowerCase().includes(filter)
    )
    console.log(filter)
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
                                <button onClick={() => handleVote(anecdote.id)}>vote</button>
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
                                <button onClick={() => handleVote(filteredAnec.id)}>vote</button>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}

export default AnecdoteList