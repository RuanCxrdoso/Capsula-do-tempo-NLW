import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://198.168.1.108:3333',
})