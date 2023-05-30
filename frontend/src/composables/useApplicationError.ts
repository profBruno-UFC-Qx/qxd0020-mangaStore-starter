import axios from 'axios'
import { ApplicationError } from '@types'


export function isApplicationError(error: any): error is ApplicationError {
  return error.name !== undefined && error.message !== undefined
}

export function getAppError(error: any): ApplicationError {
    if (axios.isAxiosError(error)) {
      if(error.response) {
        const requestError = error.response.data.error
        const { name, message, details } = requestError 
        return { name, message, details}
      } else {
        return { name: error.name, message: error.message}
      }
    } 
    throw error
}
