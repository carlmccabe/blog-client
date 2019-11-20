import axios from "axios"

export default axios.create({
  baseURL: 'https://whispering-earth-93774.herokuapp.com/',
  // baseURL: 'http://localhost:3009/',
  timeout: 10000,
  withCredentials: true
})
