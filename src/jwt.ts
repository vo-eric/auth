import jwt from 'jsonwebtoken';
import { User } from './routes/users';

export const generateJWT = (user: User): string => {
  const token = jwt.sign(
    {
      data: {
        ...user,
      },
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    },
    process.env.JWT_SECRET_KEY!
  );

  return token;
};

export const decodeJWT = (token: string) => {
  const data = jwt.verify(token, process.env.JWT_SECRET_KEY!);

  return data;
};
