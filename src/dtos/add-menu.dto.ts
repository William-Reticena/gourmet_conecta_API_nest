import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi'

import { AddMenuSchema } from '../schemas/add-menu.schema'

@JoiSchemaOptions({})
export class AddMenuDto {
  @JoiSchema(AddMenuSchema.menuName)
  name: string

  @JoiSchema(AddMenuSchema.category)
  category: number

  @JoiSchema(AddMenuSchema.restaurantId)
  restaurantId: number
}
