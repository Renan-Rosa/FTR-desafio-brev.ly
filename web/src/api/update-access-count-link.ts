// src/api/update-access-count.ts
import { api } from '../lib/axios'

export interface UpdateAccessCountResponse {
  originalUrl: string
  accessCount: number
}

export async function updateAccessCount(id: string) {
  const response = await api.patch<UpdateAccessCountResponse>(`/update/access-count-link/${id}`)
  return response.data
}
