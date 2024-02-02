import { combineReducers } from 'redux'
import anecdoteReducer from './anecdoteReducer'
// import notificationReducer from './notificationReducer'
import { createStore } from 'redux'
import filterReducer from './filterReducer'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    filters: filterReducer
})


const store = createStore(reducer)
console.log(store.getState())
export default store