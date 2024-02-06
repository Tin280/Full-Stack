import { createSlice } from '@reduxjs/toolkit'



const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        showNotification(state, action) {
            return action.payload
        },
        hideNotification(state, action) {
            return action.payload
        }
    }
})

export const { showNotification, hideNotification } = notificationSlice.actions

export const setNotification = (text, timeout) => {
    return async dispatch => {
        dispatch({
            type: 'notification/showNotification',
            payload: text
        })
        setTimeout(() => {
            dispatch({
                type: 'notification/hideNotification',
                payload: null
            })
        }, timeout * 1000)
    }
}
export default notificationSlice.reducer