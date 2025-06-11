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
