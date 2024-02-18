import * as Joi from 'joi'

export class AddAddressSchema {
  static type = Joi.number().valid(1, 2, 3).optional().messages({
    'number.base': 'Type must be a number',
    'number.empty': 'Type cannot be empty',
    'any.only': 'Type must be 1, 2 or 3',
  })

  static activeForDelivery = Joi.boolean().optional().messages({
    'boolean.base': 'Active for delivery must be a boolean',
  })

  static street = Joi.string().min(3).max(255).required().messages({
    'string.base': 'Street must be a string',
    'string.empty': 'Street cannot be empty',
    'string.min': 'Street must have at least {#limit} characters',
    'string.max': 'Street must have at most {#limit} characters',
    'any.required': 'Street is required',
  })

  static number = Joi.number().required().messages({
    'number.base': 'Number must be a number',
    'number.empty': 'Number cannot be empty',
    'any.required': 'Number is required',
  })

  static complement = Joi.string().max(100).optional().messages({
    'string.base': 'Complement must be a string',
    'string.empty': 'Complement cannot be empty',
    'string.max': 'Complement must have at most {#limit} characters',
  })

  static neighborhood = Joi.string().min(3).max(100).required().messages({
    'string.base': 'Neighborhood must be a string',
    'string.empty': 'Neighborhood cannot be empty',
    'string.min': 'Neighborhood must have at least {#limit} characters',
    'string.max': 'Neighborhood must have at most {#limit} characters',
    'any.required': 'Neighborhood is required',
  })

  static city = Joi.string().min(3).max(50).required().messages({
    'string.base': 'City must be a string',
    'string.empty': 'City cannot be empty',
    'string.min': 'City must have at least {#limit} characters',
    'string.max': 'City must have at most {#limit} characters',
    'any.required': 'City is required',
  })

  static state = Joi.string().min(2).max(2).required().messages({
    'string.base': 'State must be a string',
    'string.empty': 'State cannot be empty',
    'string.min': 'State must have at least {#limit} characters',
    'string.max': 'State must have at most {#limit} characters',
    'any.required': 'State is required',
  })

  static country = Joi.string().min(2).max(3).required().messages({
    'string.base': 'Country must be a string',
    'string.empty': 'Country cannot be empty',
    'string.min': 'Country must have at least {#limit} characters',
    'string.max': 'Country must have at most {#limit} characters',
    'any.required': 'Country is required',
  })

  static zipCode = Joi.string().min(8).max(9).required().messages({
    'string.base': 'Zip code must be a string',
    'string.empty': 'Zip code cannot be empty',
    'string.min': 'Zip code must have at least {#limit} characters',
    'string.max': 'Zip code must have at most {#limit} characters',
    'any.required': 'Zip code is required',
  })
}
