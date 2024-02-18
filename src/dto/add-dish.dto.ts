import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi'

import { AddDishSchema } from '../schemas/add-dish.schema'

@JoiSchemaOptions({})
export class AddDishDto {
  @JoiSchema(AddDishSchema.dishName)
  name: string

  @JoiSchema(AddDishSchema.price)
  price: number

  @JoiSchema(AddDishSchema.ingredients)
  ingredients: string

  @JoiSchema(AddDishSchema.photoUrl)
  photoUrl?: string

  @JoiSchema(AddDishSchema.menuId)
  menuId: number

  @JoiSchema(AddDishSchema.type)
  type?: number
}
