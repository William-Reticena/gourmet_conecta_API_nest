import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Address, User } from '../entities'

import { UserService } from './user.service'

const mockUser = [
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

describe('UserService', () => {
  let userService: UserService
  let userRepository: Repository<User>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            query: jest.fn(() => mockUser),
          },
        },
        {
          provide: getRepositoryToken(Address),
          useValue: {
            query: jest.fn(),
          },
        },
      ],
    }).compile()

    userService = module.get<UserService>(UserService)
    userRepository = module.get<Repository<User>>(getRepositoryToken(User))
  })

  it('should be defined', () => {
    expect(userService).toBeDefined()
    expect(userRepository).toBeDefined()
  })

  describe('getAllUsers', () => {
    it('should return an array of users', async () => {
      const result = await userService.getAllUsers()

      expect(result).toEqual(mockUser)
      expect(userRepository.query).toHaveBeenCalledTimes(1)
    })

    it('should throw an exception', async () => {
      jest.spyOn(userRepository, 'query').mockRejectedValueOnce(new Error('Internal server error'))

      const result = await userService.getAllUsers()

      expect(result).toThrowError('Internal server error')
    })
  })
})
