import axios from 'axios'

export const dev = "http://localhost:5000"
export const prod = "https://address-book-exp-api.herokuapp.com" 

export default axios.create({
    baseURL: prod
})