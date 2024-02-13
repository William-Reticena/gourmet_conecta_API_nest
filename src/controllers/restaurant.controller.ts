import { Body, Controller, Post } from '@nestjs/common'

import { Menu, Restaurant } from '../entities'

import { RestaurantService, UserService } from '../services'

import { AddMenuDto, CreateRestaurantDto, ResponseDto } from '../dto'

@Controller('restaurant')
export class RestaurantController {
  constructor(
    private readonly restaurantService: RestaurantService,
    private readonly userService: UserService,
  ) {}

  @Post('create')
  async createRestaurant(@Body() createRestaurantDto: CreateRestaurantDto): Promise<ResponseDto<Restaurant>> {
    const address = await this.userService.createAddress(createRestaurantDto)

    const res = await this.restaurantService.createRestaurant(createRestaurantDto, address.id)

    return new ResponseDto('Restaurant created', res)
  }

  @Post('add-menu')
  async createMenu(@Body() addMenuDto: AddMenuDto): Promise<ResponseDto<Menu>> {
    const res = await this.restaurantService.createMenu(addMenuDto)

    return new ResponseDto('Menu created', res)
  }
}
