import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => {
    axios.get(baseUrl).then(res => res.data)
}

export const createAnecdotes = () => {
    axios.post('http://localhost:3001/anecdotes').then(res => res.data)
}