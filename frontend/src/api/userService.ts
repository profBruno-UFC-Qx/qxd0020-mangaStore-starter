import { AxiosResponse } from "axios"
import { api } from "../baseConfig"
import { ApplicationError, LoginRequest, LoginResponse, User } from '@types'
import { useErrorUtil } from "../composables/useApplicationError"

class UserService {
  async login(identifier: string, password: string) : Promise<User | ApplicationError>{
    try {
      const { data } = await api.post<LoginResponse, AxiosResponse<LoginResponse>, LoginRequest>("/auth/local", {
        identifier,
        password
      })
      
      const jwt = data.jwt

      const res = await api.get<User>("/users/me", {
        params: {
          populate: ['role']
        },
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      })
      return res.data
    } catch (error) {
      return useErrorUtil().retrive(error)
    }
  }
}

export const useUserService = () => new UserService()


