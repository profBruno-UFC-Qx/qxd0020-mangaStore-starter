import axios from 'axios'
import { ApplicationError, StrapiError } from '../types'

class AppError {

  static isAppError(error: any): error is ApplicationError {
    return error.name !== undefined && error.message !== undefined
  }
  
  static retrive(error: any): ApplicationError {
    if (axios.isAxiosError<StrapiError>(error)) {
      if (error.response) {
        const { name, message, details } = error.response.data.error
        return { name, message, details: details.errors.map(d => d.message) }
      } else {
        return { name: error.name, message: error.message }
      }
    }
    throw error
  }

}

export const useErrorUtil = () => AppError