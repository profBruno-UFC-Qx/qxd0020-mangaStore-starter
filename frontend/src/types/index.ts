export interface ApplicationError {
  name: string,
  message: string,
  details?: string,
}

export interface Manga {
  id: number,
  title: string,
  price: number,
  number: number,
  cover: {
    url: string
  },
  comments: Comment[]
}

export interface Comment {
  id: number,
  description: string,
  rating: number
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

export interface User {
  id: number,
  name: string,
  email: string,
  role: {
    type: string
  }
}
