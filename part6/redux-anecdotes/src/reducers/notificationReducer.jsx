import { createSlice } from "@reduxjs/toolkit";


const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        showNotification(state, action) {
            // console.log(state)
            return action.payload
        },
        hideNotification(state, action) {
            console.log('state now: ', state)
            console.log('action', action)
            return action.payload
        }
    }
})
export const { showNotification, hideNotification } = notificationSlice.actions





export default notificationSlice.reducer