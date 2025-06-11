import { Elysia } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { users, validateUser } from './routes/users';

const app = new Elysia()
  .use(swagger())
  .get('/', () => 'Hello Elysia')
  .get('/api/public', () => {
    return {
      message: 'This is the public API route',
      status: 'success',
    };
  })
  .derive({ as: 'local' }, (request) => {
    const { headers } = request;
    return {
      user: users.find((user) => user.username === headers['username']),
      isAuthenticated: true,
    };
  })
  .onBeforeHandle({ as: 'local' }, validateUser)
  .get('/api/protected', ({ isAuthenticated, user }) => {
    return {
      message: 'This is the protected route. What are you doing here?',
      status: 'success',
      isAuthenticated,
      user,
    };
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
