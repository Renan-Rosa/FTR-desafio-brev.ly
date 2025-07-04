import { db } from '@/infra/db'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const getOriginalUrlByShortUrlRoute: FastifyPluginAsyncZod =
  async server => {
    server.get(
      '/get/original-url/:shortUrl',
      {
        schema: {
          summary: 'Get original URL by short URL',
          params: z.object({
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
            200: z.object({
              id: z.string(),
              originalUrl: z.string().url(),
            }),
            404: z.object({
              message: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { shortUrl } = request.params

        const link = await db.query.links.findFirst({
          where: (link, { eq }) => eq(link.shortUrl, shortUrl),
        })

        if (!link) {
          return reply.status(404).send({
            message: 'URL não encontradaß',
          })
        }

        return reply.status(200).send({
          id: link.id,
          originalUrl: link.originalUrl,
        })
      }
    )
  }
