import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Menu, Restaurant } from '../entities'

import { AddMenuDto, CreateRestaurantDto } from '../dto'
import { extractFromArray } from '../helpers'
import { insertQueries } from '../sql-queries/restaurant.query'

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
  ) {}

  async createRestaurant(createRestaurantDto: Pick<CreateRestaurantDto, 'name' | 'email' | 'phone'>, addressId: number): Promise<Restaurant> {
    const { name, email, phone } = createRestaurantDto

    try {
      const restaurantCreated = extractFromArray<Restaurant>(await this.restaurantRepository.query(insertQueries.createRestaurant, [name, email, phone, addressId, 1]))

      return restaurantCreated
    } catch (e) {
      console.error(e)
    }
  }

  async createMenu(addMenuDto: AddMenuDto): Promise<Menu> {
    const { name, restaurantId } = addMenuDto

    try {
      const menuCreated = extractFromArray<Menu>(await this.menuRepository.query(insertQueries.createMenu, [name, 'especial', restaurantId]))

      return menuCreated
    } catch (e) {
      console.error(e)
    }
  }
}
