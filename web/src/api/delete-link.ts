import { api } from "../lib/axios"

export async function deleteLink(id: string) {
  const response = await api.delete(`/delete/link/${id}`)
  
  return response.data
}