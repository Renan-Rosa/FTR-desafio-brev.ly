import { api } from "../lib/axios"

export async function exportLinkToCSV() {
  const response = await api.post('/exports-links-csv')
  return response.data
}