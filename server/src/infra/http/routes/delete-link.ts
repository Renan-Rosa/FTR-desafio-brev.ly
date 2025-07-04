import { db } from '@/infra/db'
import { links } from '@/infra/db/schemas/links'
import { eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const deleteLinkRoute: FastifyPluginAsyncZod = async server => {
  server.delete(
    '/delete/link/:id',
    {
      schema: {
        summary: 'Delete a link by ID',
        params: z.object({
          id: z.string().uuid('Invalid ID format'),
        }),
        response: {
          200: z.object({
            message: z.string(),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params

      // Verifica se o link existe
      const existingLink = await db.query.links.findFirst({
        where: (link, { eq }) => eq(link.id, id),
      })

      if (!existingLink) {
        return reply.status(404).send({
          message: 'Link não encontrado.',
        })
      }

      // Remove o link
      await db.delete(links).where(eq(links.id, id))

      return reply.status(200).send({
        message: 'Link deletado com sucesso!',
      })
    }
  )
}
