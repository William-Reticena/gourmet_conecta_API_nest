import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Address, User } from '../entities'

import { AddAddressDto, CreateUserDto } from '../dto'
import { deleteQueries, insertQueries, selectQueries } from '../sql-queries/user.query'
import { extractFromArray } from '../helpers'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    try {
      const users = await this.userRepository.query(selectQueries.getUsersQuery)

      return users
    } catch (e) {
      console.error(e)
    }
  }

  async getUserById(userId: number): Promise<User> {
    try {
      const user = extractFromArray<User>(await this.userRepository.query(selectQueries.getUserByIdQuery, [userId]))

      return user
    } catch (e) {
      console.error(e)
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { firstName, lastName, email, password, type } = createUserDto

    try {
      if (type > 3 || type < 1) throw new HttpException('Invalid role type', HttpStatus.BAD_REQUEST)

      const userCreated = extractFromArray<User>(await this.userRepository.query(insertQueries.createUserQuery, [firstName, lastName, email, password, type]))

      return userCreated
    } catch (e) {
      console.error(e)
    }
  }

  async getAllAddresses(): Promise<Address[]> {
    try {
      const addresses = await this.addressRepository.query(selectQueries.getAddressesQuery)

      return addresses
    } catch (e) {
      console.error(e)
    }
  }

  async getAddressById(addressId: number): Promise<Address> {
    try {
      const address = extractFromArray<Address>(await this.addressRepository.query(selectQueries.getAddressByIdQuery, [addressId]))

      if (!address) throw new HttpException('Address not found', HttpStatus.NOT_FOUND)

      return address
    } catch (e) {
      console.error(e)
    }
  }

  async createAddress(addAddressDto: AddAddressDto): Promise<Address> {
    const { type, activeForDelivery, street, number, complement, neighborhood, city, state, country, zipCode } = addAddressDto

    try {
      const addressCreated = extractFromArray<Address>(await this.addressRepository.query(insertQueries.createAddressQuery, [type, !!activeForDelivery, street, number, complement, neighborhood, city, state, country, zipCode, 1]))

      return addressCreated
    } catch (e) {
      console.error(e)
    }
  }

  async deleteAddress(addressId: number): Promise<Address> {
    try {
      const address = extractFromArray<Address>(await this.addressRepository.query(deleteQueries.deleteAddressQuery, [addressId]))

      return address
    } catch (e) {
      console.error(e)
    }
  }

  async deleteUser(userId: number): Promise<User> {
    try {
      const user = extractFromArray<User>(await this.userRepository.query(deleteQueries.deleteUserQuery, [userId]))

      return user
    } catch (e) {
      console.error(e)
    }
  }
}
