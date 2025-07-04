import { useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"

import { Download } from "../../assets/icons/download"
import { Header } from "../../components/header"
import { LinkCard } from "../../components/link-row-item"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Link } from "../../assets/icons/link"
import { Loader2 } from "lucide-react"
import { getLinks, type GetLinksResponse } from "../../api/get-links"
import { createLink } from "../../api/create-link"
import { queryClient } from "../../lib/react-query"
import { toast } from "sonner"
import { exportLinkToCSV } from "../../api/export-csv"

export function Home() {

  const [originalUrl, setOriginalUrl] = useState("")
  const [shortUrl, setShortUrl] = useState("")

  const { data: links = [], isFetching: isLoadingLinks } = useQuery<GetLinksResponse[]>({
    queryKey: ["links"],
    queryFn: getLinks,
  })

  const { mutateAsync: createLinkFn, isPending: isCreating } = useMutation({
    mutationFn: createLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] })
      setOriginalUrl("")
      setShortUrl("")
    },
  })

  async function handleCreateLink() {
      await createLinkFn({
        originalUrl,
        shortUrl,
      })

      toast.success('Link criado com sucesso!')
  }

  const { mutateAsync: exportLinkToCSVFn, isPending: isLoadingCSVDownload } =
    useMutation({
      mutationFn: exportLinkToCSV,
      onSuccess: () => {
        toast.success('Arquivo baixado com sucesso.')
      },
      onError: error => {
        console.log(error)
        toast.error('Erro ao baixar arquivo CSV. Por favor, tente novamente.')
      },
    })

  const handleDownloadCSV = async () => {
    const downloadUrl = await exportLinkToCSVFn()

    const anchor = document.createElement('a')
    anchor.href = downloadUrl.reportUrl
    anchor.download = ''
    anchor.target = '_blank'
    anchor.click()

    anchor.remove()
  }

  return (
    <div className="min-h-dvh flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-6xl">
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 mt-10">
          {/* Novo Link */}
          <div className="bg-white rounded-lg p-6 h-fit">
            <h2 className="font-bold text-lg mb-6">Novo link</h2>

            <div className="space-y-4">
              <Input
                label="Link original"
                placeholder="https://brevly.com.br"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
              />

              <Input
                label="Link encurtado"
                placeholder="brev.ly/"
                value={shortUrl}
                onChange={(e) => setShortUrl(e.target.value)}
              />

              <Button
                onClick={handleCreateLink}
                className="w-full text-white"
                disabled={!originalUrl || !shortUrl || isCreating}
              >
                Salvar link
              </Button>
            </div>
          </div>

          {/* Meus Links */}
          <div className="bg-white rounded-lg p-6 h-fit">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-text-lg font-bold text-gray-600">Meus links</h2>

              <Button variant="secondary" size="sm" onClick={handleDownloadCSV} disabled={isLoadingCSVDownload} >
                <Download />
                Baixar CSV
              </Button>
            </div>

            <div className="border-b border-gray-200 mb-2" />

            {isLoadingLinks ? (
              <div className="flex justify-center items-center py-10">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            ) : links.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 gap-2">
                <Link />
                <span className="text-sm uppercase text-gray-400">
                  Ainda não existem links cadastrados
                </span>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {links.map((link) => (
                  <LinkCard key={link.id} link={link} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
