const initialState = '';

// Action creator
export const filterChange = (filter) => ({
    type: 'FILTER_CHANGE',
    payload: filter
});

// Reducer
const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FILTER_CHANGE':
            return action.payload; // Update the state to the new filter value
        default:
            return state; // No change for other action types
    }
};

export default filterReducer;