import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi'

import { AddAddressSchema } from '../schemas/add-address.schema'

@JoiSchemaOptions({})
export class AddAddressDto {
  @JoiSchema(AddAddressSchema.type)
  type?: string

  @JoiSchema(AddAddressSchema.activeForDelivery)
  activeForDelivery?: boolean

  @JoiSchema(AddAddressSchema.street)
  street: string

  @JoiSchema(AddAddressSchema.number)
  number: number

  @JoiSchema(AddAddressSchema.complement)
  complement?: string

  @JoiSchema(AddAddressSchema.neighborhood)
  neighborhood: string

  @JoiSchema(AddAddressSchema.city)
  city: string

  @JoiSchema(AddAddressSchema.state)
  state: string

  @JoiSchema(AddAddressSchema.country)
  country: string

  @JoiSchema(AddAddressSchema.zipCode)
  zipCode: string
}
