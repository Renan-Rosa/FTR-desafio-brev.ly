// src/routes/update-access-count-link.ts
import { db } from '@/infra/db'
import { links } from '@/infra/db/schemas/links'
import { eq, sql } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const updateAccessCountLinkRoute: FastifyPluginAsyncZod =
  async server => {
    server.patch(
      '/update/access-count-link/:id',
      {
        schema: {
          summary: 'Update access count of a link by ID',
          params: z.object({
            id: z.string().uuid('Invalid ID format'),
          }),
          response: {
            200: z.object({
              originalUrl: z.string().url(),
              accessCount: z.number(),
            }),
            404: z.object({
              message: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { id } = request.params

        const [updated] = await db
          .update(links)
          .set({ accessCount: sql`${links.accessCount} + 1` })
          .where(eq(links.id, id))
          .returning({
            originalUrl: links.originalUrl,
            accessCount: links.accessCount, // novo valor
          })

        // Se nenhum registro foi atualizado, o ID não existe
        if (!updated) {
          return reply.status(404).send({ message: 'Link not found.' })
        }

        // Sucesso
        return reply.status(200).send(updated)
      }
    )
  }
