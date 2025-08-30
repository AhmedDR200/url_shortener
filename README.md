# URL Shortener Service

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-badge&logo=redis&logoColor=white)](https://redis.io/)

A high-performance URL shortener service built with NestJS, MySQL, and Redis. This service provides secure and scalable URL shortening with domain allowlisting and analytics.

## Features

- **URL Shortening**: Convert long URLs to short, memorable codes
- **Domain Allowlisting**: Only shorten URLs from allowed domains
- **Rate Limiting**: Protect the API from abuse
- **Caching**: Improve performance with Redis caching
- **Analytics**: Track URL hits and usage patterns
- **RESTful API**: Well-documented endpoints with Swagger
- **Authentication**: Secure API with API keys

## Prerequisites

- Node.js (v16 or later)
- MySQL (v5.7 or later)
- Redis (v6 or later)
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/url-shortener.git
   cd url-shortener
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up the environment:
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your configuration.

4. Set up the database:
   ```bash
   # Run migrations
   npm run db:migrate
   
   # (Optional) Seed the database with test data
   # npm run db:seed:all
   ```

5. Start the development server:
   ```bash
   npm run start:dev
   ```

The API will be available at `http://localhost:3000` by default.

## API Documentation

Once the server is running, you can access the interactive API documentation at:
- Swagger UI: http://localhost:3000/api
- JSON Schema: http://localhost:3000/api-json

## API Endpoints

### Shorten a URL

```http
POST /api/shorten
Content-Type: application/json
X-API-Key: your-api-key

{
  "long_url": "https://example.com/very/long/url"
}
```

**Response**
```json
{
  "short": "abc123"
}
```

### Resolve a Short URL

```http
GET /api/resolve/abc123
```

**Response**
```json
{
  "long_url": "https://example.com/very/long/url"
}
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Port to run the server on | `3000` |
| `NODE_ENV` | Node environment | `development` |
| `DB_HOST` | MySQL host | `localhost` |
| `DB_PORT` | MySQL port | `3306` |
| `DB_USER` | MySQL username | `root` |
| `DB_PASS` | MySQL password |  |
| `DB_NAME` | MySQL database name | `url_shortener` |
| `REDIS_HOST` | Redis host | `localhost` |
| `REDIS_PORT` | Redis port | `6379` |
| `API_KEY` | API key for authentication |  |
| `THROTTLE_TTL` | Rate limit time window (seconds) | `60` |
| `THROTTLE_LIMIT` | Max requests per time window | `100` |

## Development

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Database Migrations

To create a new migration:
```bash
npm run db:create migration-name
```

To run migrations:
```bash
npm run db:migrate
```

To rollback the last migration:
```bash
npm run db:migrate:undo
```

## Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm run start:prod
   ```

## License

This project is [MIT licensed](LICENSE).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ pnpm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
# url_shortener
