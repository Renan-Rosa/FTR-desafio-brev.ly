import { api } from "../lib/axios"

export interface GetLinksResponse {
  id: string,
  shortUrl: string,
  accessCount: number,
  originalUrl: string
}

export async function getLinks() {
  const response = await api.get<GetLinksResponse[]>('/get/links')

  return response.data
}