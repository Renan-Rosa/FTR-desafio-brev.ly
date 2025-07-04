## Funcionalidades e Regras

<aside>
    Para esse desafio é esperado que você utilize o banco de dados Postgres.
</aside>

- [X]  Deve ser possível criar um link
    - [X]  Não deve ser possível criar um link com URL encurtada mal formatada
    - [X]  Não deve ser possível criar um link com URL encurtada já existente
- [X]  Deve ser possível deletar um link
- [X]  Deve ser possível obter a URL original por meio de uma URL encurtada
- [X]  Deve ser possível listar todas as URL’s cadastradas
- [X]  Deve ser possível incrementar a quantidade de acessos de um link
- [X]  Deve ser possível exportar os links criados em um CSV
    - [X]  Deve ser possível acessar o CSV por meio de uma CDN (Amazon S3, Cloudflare R2, etc)
    - [X]  Deve ser gerado um nome aleatório e único para o arquivo
    - [X]  Deve ser possível realizar a listagem de forma performática
    - [X]  O CSV deve ter campos como, URL original, URL encurtada, contagem de acessos e data de criação.


Veja que não especificamos se nas funcionalidades de deletar ou incrementar acessos, deve ser utilizado um campo `id` ou URL encurtada para realizar tais operações. Essa é uma decisão que cabe a você, desenvolvedor, escolher. Não há certo ou errado aqui, mas o recomendado é manter um padrão, se escolher `id`, que seja em ambas. Consistência e padrão são importantes.

*Lembrando que essa escolha irá impactar também no front-end.*

## Ferramentas

É obrigatório o uso de:

- TypeScript
- Fastify
- Drizzle
- Postgres