import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'

import { Address, User } from '../entities'

import { UserService } from '../services/user.service'

import { AddAddressDto, CreateUserDto, ResponseDto } from '../dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('address/:addressId?')
  async getAddress(@Param('addressId') addressId?: number): Promise<ResponseDto<Address[] | Address>> {
    if (addressId) {
      const res = await this.userService.getAddressById(addressId)

      return new ResponseDto('Address found', res)
    }

    const res = await this.userService.getAllAddresses()

    return new ResponseDto('Addresses found', res)
  }

  @Get(':userId?')
  async getUsers(@Param('userId') userId?: number): Promise<ResponseDto<User[] | User>> {
    if (userId) {
      const res = await this.userService.getUserById(userId)

      return new ResponseDto('User found', res)
    }

    const res = await this.userService.getAllUsers()

    return new ResponseDto('Users found', res)
  }

  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<ResponseDto<User>> {
    const res = await this.userService.createUser(createUserDto)

    return new ResponseDto('User created', res)
  }

  @Post('address')
  async createAddress(@Body() addAddressDto: AddAddressDto): Promise<ResponseDto<Address>> {
    const res = await this.userService.createAddress(addAddressDto)

    return new ResponseDto('Address created', res)
  }

  @Delete('address/:addressId')
  async deleteAddress(@Param('addressId') addressId: number): Promise<ResponseDto<Address>> {
    const res = await this.userService.deleteAddress(addressId)

    return new ResponseDto('Address deleted', res)
  }
}
