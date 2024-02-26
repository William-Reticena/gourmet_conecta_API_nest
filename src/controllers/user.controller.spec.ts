import { Test, TestingModule } from '@nestjs/testing'

import { UserController } from './user.controller'
import { UserService } from '../services'
import { mockUser } from '../mocks'
// import { Repository } from 'typeorm'

describe('UserController', () => {
  let userController: UserController
  let userService: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            getAllUsers: jest.fn(() => ({ message: 'Users found', data: mockUser })),
            getUserById: jest.fn(() => mockUser[0]),
            createUser: jest.fn(),
          },
        },
      ],
    }).compile()

    userController = module.get<UserController>(UserController)
    userService = module.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(userController).toBeDefined()
    expect(userService).toBeDefined()
  })

  it('should return an array of users', async () => {
    const result = await userController.getUsers()

    console.log(result, 'resul')

    expect(result).toEqual({ message: 'Users found', data: mockUser })
  })
})
