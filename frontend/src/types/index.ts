export interface ApplicationError {
  name: string,
  message: string,
  details?: string,
}

export interface StrapiResponse<T> {
  data: T,
  meta: {
    pagination: Pagination
  }
}

export interface StrapiError {
  error: {
    status: number,
    name: string,
    message: string,
    details: {
      errors: StrapiErrorDetail[]
    }
  }
}

export interface StrapiErrorDetail {
  path: string[],
  message: string,
  name: string,
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

export interface LoginRequest {
  identifier: string,
  password: string
}

export interface LoginResponse {
  jwt: string,
  user: User
}

export interface User {
  id: number,
  username: string,
  email: string,
  role: {
    type: string
  }
}
