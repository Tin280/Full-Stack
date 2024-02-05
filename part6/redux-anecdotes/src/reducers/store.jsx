import { combineReducers } from 'redux'
import anecdoteSlice from './anecdoteReducer'
// import notificationReducer from './notificationReducer'
import { createStore } from 'redux'
import filterSlice from './filterReducer'
import notificationSlice from './notificationReducer'
// import thunk from 'redux-thunk'

const reducer = combineReducers({
    anecdotes: anecdoteSlice,
    filters: filterSlice,
    notifications: notificationSlice,
})


const store = createStore(reducer)
console.log(store.getState())
export default store