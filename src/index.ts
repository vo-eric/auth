import { Elysia, t } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { users, validateUser } from './routes/users';
import { jwt } from '@elysiajs/jwt';
import { cookie } from '@elysiajs/cookie';

const app = new Elysia()
  .use(swagger())
  .use(cookie())
  .use(
    jwt({
      name: 'jwt',
      secret: process.env.JWT_SECRET_KEY!,
      exp: '3d',
    })
  )
  .get('/', () => 'Hello Elysia')
  .get('/api/public', () => {
    return {
      message: 'This is the public API route',
      status: 'success',
    };
  })
  .post(
    '/api/login',
    async ({ jwt, cookie, body: { username, password } }) => {
      const user = users.find((user) => {
        return user.username === username && user.password === password;
      });

      if (!user) return;

      const token = await jwt.sign({
        username,
        password,
      });

      cookie.authToken.set({
        value: token,
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 60 * 60,
        path: '/',
      });
      return token;
    },
    {
      body: t.Object({
        username: t.String({ minLength: 1 }),
        password: t.String({ minLength: 1 }),
      }),
    }
  )
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
