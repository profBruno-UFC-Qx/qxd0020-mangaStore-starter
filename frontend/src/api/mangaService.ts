import { api } from '../baseConfig'

export interface Manga {
  title: string,
  price: number,
  number: number,
  cover: {
    url: string
  }
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

  async get(): Promise<MangaCollection> {
    const { data } = await api.get('/mangas', {
      params: {
        populate: ['cover']
      }
    })
    return { items: data.data, pagination: data.meta.pagination }
  }
}


export const useMangaService = () => new MangaService()