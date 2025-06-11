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
  secret: string;
}

export const users: User[] = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    role: Role.Admin,
    secret: 'admin-secret-123',
  },
  {
    id: 2,
    username: 'user',
    password: 'user123',
    role: Role.Basic,
    secret: 'user-secret-456',
  },
];

export const validateUser = ({
  headers,
}: {
  headers: Record<string, string | undefined>;
}) => {
  const bearerToken = headers['authorization'];

  if (!bearerToken) {
    return ERROR_CODES[403];
  }

  const [_, token] = bearerToken?.split(' ');

  const user = users.find((user) => user.secret === token);

  if (!user || user.role !== Role.Admin) {
    return ERROR_CODES[403];
  }
};
