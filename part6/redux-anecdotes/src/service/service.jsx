import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNewAnecdote = async (newAnecdote) => {
    const response = await axios.post(baseUrl, newAnecdote)
    return response.data
}

const updateVote = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    const objectToChange = response.data
    const newObject = { ...objectToChange, votes: objectToChange.votes + 1 }
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default { getAll, createNewAnecdote, updateVote }