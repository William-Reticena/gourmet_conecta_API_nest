import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi'

import { CreateRestaurantSchema } from '../schemas/create-restaurant.schema'

@JoiSchemaOptions({})
export class CreateRestaurantDto {
  @JoiSchema(CreateRestaurantSchema.restaurantName)
  name: string

  @JoiSchema(CreateRestaurantSchema.phone)
  phone: string

  @JoiSchema(CreateRestaurantSchema.email)
  email: string

  @JoiSchema(CreateRestaurantSchema.street)
  street: string

  @JoiSchema(CreateRestaurantSchema.number)
  number: number

  @JoiSchema(CreateRestaurantSchema.complement)
  complement?: string

  @JoiSchema(CreateRestaurantSchema.neighborhood)
  neighborhood: string

  @JoiSchema(CreateRestaurantSchema.city)
  city: string

  @JoiSchema(CreateRestaurantSchema.state)
  state: string

  @JoiSchema(CreateRestaurantSchema.country)
  country: string

  @JoiSchema(CreateRestaurantSchema.zipCode)
  zipCode: string
}
