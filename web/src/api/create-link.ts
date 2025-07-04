import { api } from "../lib/axios"

export interface CreateLinksRequest {
  shortUrl: string,
  originalUrl: string
}

export interface CreateLinksResponse {
  shortUrl: string,
}

export async function createLink({ shortUrl, originalUrl }: CreateLinksRequest) {
  const response = await api.post<CreateLinksResponse>('/create/link', {
    shortUrl, originalUrl
  })

  return response.data
}