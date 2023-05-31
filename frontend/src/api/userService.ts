import { AxiosResponse } from "axios"
import { api } from "../baseConfig"
import { LoginRequest, LoginResponse, User } from '@types'

class UserService {
  async login(identifier: string, password: string) : Promise<User | Error>{
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
      return error as Error
    }
  }
}

export const useUserService = () => new UserService()


