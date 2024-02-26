import { User } from '../entities'

export const mockUser = [
  new User({
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john_doe@hotmail.com',
    password: '123456',
    tokenValidation: '123456',
    roleId: 1,
  }),
  new User({
    id: 2,
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@gmail.com',
    password: '123456',
    tokenValidation: '123456',
    roleId: 2,
  }),
]
