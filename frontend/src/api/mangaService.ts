import { api } from '../baseConfig'
import { StrapiResponse, MangaCollection, Manga } from '@types'



class MangaService {

  async get(page =  1): Promise<MangaCollection> {
    const { data } = await api.get<StrapiResponse<Manga[]>>('/mangas', {
      params: {
        populate: ['cover'],
        "pagination[page]": page,
      }
    })
    return { items: data.data, pagination: data.meta.pagination }
  }

  async getById(id: number): Promise<Manga> {
    const { data } = await api.get<StrapiResponse<Manga>>(`/mangas/${id}`, {
      params: {
        populate: ['cover', 'comments']
      }
    })
    return data.data
  }
}


export const useMangaService = () => new MangaService()