import { api } from "../lib/axios"

export type GetOriginalLinkResponse = {
  id: string
  originalUrl: string
}

export async function getOriginalLink(shortUrl: string) {
  const response = await api.get<GetOriginalLinkResponse>(`/get/original-url/${shortUrl}`)

  return response.data
}