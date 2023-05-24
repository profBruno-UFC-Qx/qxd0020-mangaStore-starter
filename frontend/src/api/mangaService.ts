import { api } from '../baseConfig'

export interface Manga {
  id: number,
  title: string,
  price: number,
  number: number,
  cover: {
    url: string
  },
  comments:[{
    id: number,
    description: string,
    rating: number
  }]
}

export interface Pagination {
  page: number,
  pageCount: number,
  pageSize: number,
  total: number
}

export interface MangaCollection {
  items: Manga[],
  pagination: Pagination
}

class MangaService {

  async get(page =  1): Promise<MangaCollection> {
    const { data } = await api.get('/mangas', {
      params: {
        populate: ['cover'],
        "pagination[page]": page,
      }
    })
    return { items: data.data, pagination: data.meta.pagination }
  }

  async getById(id: number): Promise<Manga> {
    const { data } = await api.get(`/mangas/${id}`, {
      params: {
        populate: ['cover', 'comments']
      }
    })
    return data.data
  }


}


export const useMangaService = () => new MangaService()