import * as Joi from 'joi'

export class AddDishSchema {
  static dishName = Joi.string().min(3).max(255).required().messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name cannot be empty',
    'string.min': 'Name must have at least {#limit} characters',
    'string.max': 'Name must have at most {#limit} characters',
    'any.required': 'Name is required',
  })

  static price = Joi.number().required().messages({
    'number.base': 'Price must be a number',
    'number.empty': 'Price cannot be empty',
    'any.required': 'Price is required',
  })

  static ingredients = Joi.string().min(3).max(255).required().messages({
    'string.base': 'Ingredients must be a string',
    'string.empty': 'Ingredients cannot be empty',
    'string.min': 'Ingredients must have at least {#limit} characters',
    'string.max': 'Ingredients must have at most {#limit} characters',
    'any.required': 'Ingredients is required',
  })

  static photoUrl = Joi.string().uri().optional().messages({
    'string.base': 'Photo URL must be a string',
    'string.uri': 'Photo URL must be a valid URL',
  })

  static menuId = Joi.number().required().messages({
    'number.base': 'Menu ID must be a number',
    'number.empty': 'Menu ID cannot be empty',
    'any.required': 'Menu ID is required',
  })

  static type = Joi.number().valid(1, 2, 3).optional().messages({
    'number.base': 'Type must be a number',
    'number.empty': 'Type cannot be empty',
    'any.only': 'Type must be 1, 2 or 3',
  })
}
