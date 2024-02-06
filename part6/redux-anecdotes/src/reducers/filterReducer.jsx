import { createSlice } from "@reduxjs/toolkit";

const initialState = '';



const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filterAnecdote(state, action) {
            // console.log(action)
            return action.payload.toLowerCase()
        }
    }
})
export const { filterAnecdote } = filterSlice.actions


// Action creator
// export const filterChange = (filter) => filterAnecdote({
//     type: 'FILTER_CHANGE',
//     payload: filter
// });

// Reducer
// const filterReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case 'FILTER_CHANGE':
//             return action.payload; // Update the state to the new filter value
//         default:
//             return state; // No change for other action types
//     }
// };

export default filterSlice.reducer;