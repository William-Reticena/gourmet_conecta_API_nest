import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'

import { Address, User } from '../entities'

import { AddAddressDto, CreateUserDto } from '../dtos'
import { deleteQueries, insertQueries, selectQueries } from '../sql-queries/user.query'
import { extractFromArray } from '../helpers'
import { IUser } from '../interfaces'

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
      const hashedPassword = await bcrypt.hash(password, 10)

      console.log(hashedPassword)

      const userCreated = extractFromArray<User>(await this.userRepository.query(insertQueries.createUserQuery, [firstName, lastName, email, hashedPassword, type]))

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

  async validatePassword(password: string, userPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, userPassword)
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const user = extractFromArray<User>(await this.userRepository.query(selectQueries.getUserByEmailQuery, [email]))

      return user
    } catch (e) {
      console.error(e)
    }
  }

  async createAddress(addAddressDto: AddAddressDto, user: IUser): Promise<Address> {
    const { type, activeForDelivery, street, number, complement, neighborhood, city, state, country, zipCode } = addAddressDto

    try {
      const addressCreated = extractFromArray<Address>(await this.addressRepository.query(insertQueries.createAddressQuery, [type, !!activeForDelivery, street, number, complement, neighborhood, city, state, country, zipCode, user.id]))

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
