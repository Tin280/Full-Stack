// import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import anecdoteSlice from './anecdoteReducer'
import filterSlice from './filterReducer'
import notificationSlice from './notificationReducer'

// const reducer = combineReducers({
//     anecdotes: anecdoteSlice,
//     filters: filterSlice,
//     notifications: notificationSlice,
// })


// const store = createStore(reducer)
const store = configureStore({
    reducer: {
        anecdotes: anecdoteSlice,
        filters: filterSlice,
        notifications: notificationSlice,
    }

})
console.log(store.getState())
export default store