import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Dish, Menu, Restaurant } from '../entities'

import { AddDishDto, AddMenuDto, CreateRestaurantDto } from '../dtos'
import { extractFromArray } from '../helpers'
import { IUser } from '../interfaces'
import { insertQueries } from '../sql-queries/restaurant.query'

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
    @InjectRepository(Dish)
    private readonly dishRepository: Repository<Dish>,
  ) {}

  async createRestaurant(createRestaurantDto: Pick<CreateRestaurantDto, 'name' | 'email' | 'phone'>, addressId: number, user: IUser): Promise<Restaurant> {
    const { name, email, phone } = createRestaurantDto

    try {
      const restaurantCreated = extractFromArray<Restaurant>(await this.restaurantRepository.query(insertQueries.createRestaurant, [name, email, phone, addressId, user.id]))

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

  async createDish(addDishDto: AddDishDto): Promise<Dish> {
    const { name, ingredients, menuId, price, photoUrl, type } = addDishDto

    try {
      const dishCreated = extractFromArray<Dish>(await this.dishRepository.query(insertQueries.createDish, [name, price, ingredients, photoUrl, 'Petisco', menuId]))

      return dishCreated
    } catch (e) {
      console.error(e)
    }
  }
}
