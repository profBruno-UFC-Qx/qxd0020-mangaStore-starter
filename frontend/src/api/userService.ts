import { AxiosResponse } from "axios"
import { api } from "../baseConfig"
import { ApplicationError, LoginRequest, LoginResponse, User } from '../types'
import { useErrorUtil } from "../composables/useApplicationError"
import { useUserStore } from "../stores/userStore"

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
      this.saveLocally(res.data, jwt)
      
      const userStore  = useUserStore()
      userStore.username = res.data.username
      userStore.role = res.data.role.type
      userStore.jwt = jwt

      return res.data
    } catch (error) {
      return useErrorUtil().retrive(error)
    }
  }

  saveLocally(user: User, jwt: string){
    localStorage.setItem("username", user.username)
    localStorage.setItem("token", jwt)
    localStorage.setItem("role", user.role.type)
  }
}

export const useUserService = () => new UserService()


