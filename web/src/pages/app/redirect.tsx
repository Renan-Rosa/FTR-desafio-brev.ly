import { useEffect, useRef } from 'react'
import { Navigate, useParams } from 'react-router'
import { useQuery, useMutation } from '@tanstack/react-query'
import { getOriginalLink } from '../../api/get-original-url'
import { updateAccessCount } from '../../api/update-access-count-link'
import { queryClient } from '../../lib/react-query'

export function Redirect() {
  const { shortUrl } = useParams<{ shortUrl: string }>()
  const triggered = useRef(false)

  const {
    data: link,
    isError,
  } = useQuery({
    queryKey: ['link', shortUrl],
    queryFn: () => getOriginalLink(shortUrl!), 
    enabled: !!shortUrl,
    retry: false,
    staleTime: Infinity,
  })

  const { mutate: increaseAccessCount } = useMutation({
    mutationFn: (id: string) => updateAccessCount(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['link', shortUrl] })
      queryClient.invalidateQueries({ queryKey: ['links'] })
      window.location.replace(data.originalUrl)

    },
  })

  useEffect(() => {
    if (link?.id && !triggered.current) {
      triggered.current = true
      increaseAccessCount(link.id)
    }
  }, [link, increaseAccessCount])

  if (isError) return <Navigate to="*" replace />

    {
    return (
    <div className="flex min-h-screen w-screen items-center justify-center px-3">
      <div className="flex flex-col items-center gap-6 rounded-lg bg-gray-100 px-12 py-16">
        <img src="/Icon.svg" alt="Brevly logo" className="h-12 w-12" />
        <h1 className="text-xl text-gray-600">Redirecionando…</h1>
        <p className="text-md text-center text-gray-500">
          O link será aberto automaticamente em alguns instantes.
        </p>
        <p className="text-md text-center text-gray-500">
          Não foi redirecionado?&nbsp;
          <a href="/" className="text-blue-base underline">Acesse aqui</a>
        </p>
      </div>
    </div>
  )
  }
}
