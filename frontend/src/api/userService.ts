import { api } from "../baseConfig"
import { User } from '@types'

class UserService {
  async login(identifier: string, password: string) : Promise<User | Error>{
    try {
      const { data } = await api.post("/auth/local", {
        identifier,
        password
      })
      
      const jwt = data.jwt

      const res = await api.get("/users/me", {
        params: {
          populate: ['role']
        },
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      })
      return res.data as User
    } catch (error) {
      return error as Error
    }
  }
}

export const useUserService = () => new UserService()


