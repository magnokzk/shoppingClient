import axios from 'axios'

const token = localStorage.getItem('token')

export const api = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        Authorization: token
    }
})