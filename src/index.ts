import { Elysia } from 'elysia';
import { swagger } from '@elysiajs/swagger';

const app = new Elysia()
  .use(swagger())
  .get('/', () => 'Hello Elysia')
  .get('/api/public', () => {
    return {
      message: 'This is the public API route',
      status: 'success',
    };
  })
  .get('/api/protected', () => {
    return {
      message: 'This is the protected route. What are you doing here?',
      status: 'success',
    };
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
