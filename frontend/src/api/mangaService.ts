import { api } from '../baseConfig'
import { StrapiResponse, MangaCollection, Manga, ApplicationError } from '@types'
import { useErrorUtil } from '../composables/useApplicationError'
import { useUserStore } from '../stores/userStore'



class MangaService {

  async get(page =  1): Promise<MangaCollection | ApplicationError> {
    try {
      const { data } = await api.get<StrapiResponse<Manga[]>>('/mangas', {
        params: {
          populate: ['cover'],
          "pagination[page]": page,
        }
      })
      return { items: data.data, pagination: data.meta.pagination }
    } catch (error) {
      return useErrorUtil().retrive(error)
    }
  }

  async getById(id: number): Promise<Manga | ApplicationError> {
    try {
      const { data } = await api.get<StrapiResponse<Manga>>(`/mangas/${id}`, {
        params: {
          populate: ['cover', 'comments']
        }
      })
      return data.data
    } catch (error) {
      return useErrorUtil().retrive(error)
    }
  }

  async remove(id: number): Promise<Manga | ApplicationError> {
    const userStore = useUserStore()
    try {
      const { data } = await api.delete<StrapiResponse<Manga>>(`/mangas/${id}`, {
        headers: {
          Authorization: `Bearer ${userStore.jwt}`
        }
      })
      return data.data
    } catch (error) {
      return useErrorUtil().retrive(error)
    } 
  }
}


export const useMangaService = () => new MangaService()