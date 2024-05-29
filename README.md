# Projeto Catálogo de Filmes

Bem-vindo ao projeto Catálogo de Filmes! Este projeto é uma API para gerenciamento de um catálogo de filmes, com autenticação JWT, utilizando uma stack moderna de tecnologias. A seguir, estão os detalhes de cada componente utilizado no projeto.

## Tecnologias Utilizadas

- **NestJS**: Framework para construção do backend.
- **PostgreSQL**: Banco de dados relacional para armazenamento persistente.
- **Redis**: Banco de dados de cache para melhorar a performance.
- **Swagger**: Ferramenta para documentação da API.
- **Prisma**: ORM (Object-Relational Mapping) para interação com o banco de dados.
- **Docker**: Contêineres para facilitar o desenvolvimento e a implantação.
- **Railway**: Plataforma de deploy para hospedar a aplicação.

## Instalação e Configuração

### 1. Clonar o Repositório

```bash
git clonehttps://github.com/JotaveX/MKS-Challange
cd MKS-Challange
```

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
JWT_SECRET="sua_chave_secreta"
REDIS_HOST="redis_host"
REDIS_PORT="redis_port"
PORT="80"
```

### 3. Instalar Dependências

```bash
npm install
```

### 4. Configurar o Prisma

```bash
npx prisma migrate dev
npx prisma generate
```

### 5. Executar com Docker

```bash
docker-compose up -d
```

### 6. Acessar a Documentação

A documentação da API estará disponível no Swagger através do endpoint `/api` no seu servidor local ou no link de produção.

## Deploy no Railway

1. Conecte seu repositório ao Railway.
2. Adicione as variáveis de ambiente no painel do Railway.
3. Configure os serviços PostgreSQL e Redis diretamente no Railway.
4. Faça o deploy pelo painel do Railway.

## Endpoints Principais

- **Autenticação**:
  - `POST /auth/login`: Autentica um usuário e retorna um token JWT.
  - `POST /auth/register`: Registra um novo usuário.

- **Filmes**:
  - `GET /movies`: Lista todos os filmes.
  - `POST /movies`: Adiciona um novo filme.
  - `GET /movies/:id`: Obtém detalhes de um filme.
  - `PUT /movies/:id`: Atualiza um filme.
  - `DELETE /movies/:id`: Deleta um filme.

- **Usuários**:
  - `GET /users`: Lista todos os usuários.
  - `GET /users/:id`: Obtém detalhes de um usuário.
  - `PUT /users/:id`: Atualiza um usuário.
  - `DELETE /users/:id`: Deleta um usuário.

## Acesso à Aplicação

A aplicação pode ser acessada no link de produção: [Catálogo de Filmes](https://mks-challange-production.up.railway.app)

## Contribuição

Sinta-se à vontade para contribuir com este projeto. Faça um fork, crie uma branch e envie um pull request com suas melhorias.

## Licença

Este projeto está licenciado sob a MIT License.

---

Feito com ♥ por [João Victor Piloni](https://github.com/JotaveX)