import { db } from '@/infra/db'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const getLinksRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/get/links',
    {
      schema: {
        summary: 'Get all links',
        response: {
          200: z.array(
            z.object({
              id: z.string().uuid(),
              shortUrl: z.string(),
              accessCount: z.number(),
              originalUrl: z.string().url(),
            })
          ),
          404: z.object({
            message: z.literal('Nenhum link encontrado.'),
          }),
        },
      },
    },
    async (request, reply) => {
      // Busca por todos os links
      const results = await db.query.links.findMany({
        columns: {
          id: true,
          shortUrl: true,
          accessCount: true,
          originalUrl: true,
        },
        orderBy: (links, { desc }) => [desc(links.createdAt)],
      })

      if (results.length === 0) {
        return reply.status(404).send({ message: 'Nenhum link encontrado.' })
      }

      return reply.status(200).send(results)
    }
  )
}
