export class AddAddressDto {
  type?: string
  activeForDelivery?: boolean
  street: string
  number: number
  complement?: string
  neighborhood: string
  city: string
  state: string
  country: string
  zipCode: string
}
