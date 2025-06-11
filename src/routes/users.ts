import Elysia from 'elysia';
import { ERROR_CODES } from '../errorCodes';

export enum Role {
  Admin = 'admin',
  Basic = 'basic',
}

export interface User {
  id: number;
  username: string;
  password: string;
  role: Role;
}

export const users = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
  { id: 2, username: 'user', password: 'user123', role: 'basic' },
];

export const validateUser = ({
  headers,
}: {
  headers: Record<string, string | undefined>;
}) => {
  const username = headers['username'];

  if (!username) {
    return ERROR_CODES[403];
  }

  const user = users.find((user) => user.username === username);

  if (!user || user.role !== Role.Admin) {
    return ERROR_CODES[403];
  }
};
