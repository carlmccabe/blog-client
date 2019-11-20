import axios from "axios"

export default axios.create({
  baseURL: process.env.EXPRESS_URI ||'https://whispering-earth-93774.herokuapp.com/',
  // Development URL
  // baseURL: 'http://localhost:3009/',
  timeout: 10000,
  withCredentials: true
})
