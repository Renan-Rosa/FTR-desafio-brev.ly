import { db } from '@/infra/db'
import { links } from '@/infra/db/schemas/links'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const createLinkRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/create/link',
    {
      schema: {
        summary: 'Create a link',
        body: z.object({
          originalUrl: z.string().url(),
          shortUrl: z
            .string()
            .min(3, 'Short URL must have at least 3 characters')
            .max(20, 'Short URL must have at most 20 characters')
            .regex(
              /^[a-zA-Z0-9_-]+$/,
              'Short URL can only contain letters, numbers, hyphens, and underscores'
            ),
        }),
        response: {
          201: z.object({
            message: z.string(),
            shortUrl: z.string(),
          }),
          409: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { originalUrl, shortUrl } = request.body

      // Verifica se já existe o shortUrl na base
      const existingLink = await db.query.links.findFirst({
        where: (link, { eq }) => eq(link.shortUrl, shortUrl),
      })

      if (existingLink) {
        return reply.status(409).send({
          message: 'Esse link encurtado já está sendo usado.',
        })
      }

      // Cria o link na base
      await db.insert(links).values({
        originalUrl,
        shortUrl,
        accessCount: 0,
      })

      return reply.status(201).send({
        message: 'Link criado com sucesso!',
        shortUrl,
      })
    }
  )
}
