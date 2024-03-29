import { Body, Controller, Post } from '@nestjs/common'
import { JoiPipe } from 'nestjs-joi'

import { Dish, Menu, Restaurant } from '../entities'

import { RestaurantService, UserService } from '../services'

import { AddDishDto, AddMenuDto, CreateRestaurantDto, ResponseDto } from '../dtos'
import { GetUser } from '../decorators'
import { IUser } from '../interfaces'

@Controller('restaurant')
export class RestaurantController {
  constructor(
    private readonly restaurantService: RestaurantService,
    private readonly userService: UserService,
  ) {}

  @Post('create')
  async createRestaurant(@GetUser() user: IUser, @Body(JoiPipe) createRestaurantDto: CreateRestaurantDto): Promise<ResponseDto<Restaurant>> {
    const address = await this.userService.createAddress(createRestaurantDto, user)

    const res = await this.restaurantService.createRestaurant(createRestaurantDto, address.id, user)

    return new ResponseDto('Restaurant created', res)
  }

  @Post('add-menu')
  async createMenu(@Body(JoiPipe) addMenuDto: AddMenuDto): Promise<ResponseDto<Menu>> {
    const res = await this.restaurantService.createMenu(addMenuDto)

    return new ResponseDto('Menu created', res)
  }

  @Post('add-dish')
  async createDish(@Body(JoiPipe) addDishDto: AddDishDto): Promise<ResponseDto<Dish>> {
    const res = await this.restaurantService.createDish(addDishDto)

    return new ResponseDto('Dish created', res)
  }
}
