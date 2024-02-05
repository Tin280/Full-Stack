import { useDispatch } from 'react-redux'
import { filterAnecdote } from '../reducers/filterReducer';

const Filter = () => {
    const dispatch = useDispatch()


    const handleChange = (event) => {
        event.preventDefault();
        const filterValue = event.target.value
        dispatch(filterAnecdote(filterValue));
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

export default Filter