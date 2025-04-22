import { getContentType } from './api.helper'
import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.SERVER_URL,
  headers: getContentType()
})
