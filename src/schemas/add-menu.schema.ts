import * as Joi from 'joi'

export class AddMenuSchema {
  static menuName = Joi.string().min(3).max(255).required().messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name cannot be empty',
    'string.min': 'Name must have at least {#limit} characters',
    'string.max': 'Name must have at most {#limit} characters',
    'any.required': 'Name is required',
  })

  static category = Joi.number().valid(1, 2, 3).required().messages({
    'number.base': 'Category must be a number',
    'number.empty': 'Category cannot be empty',
    'any.only': 'Category must be 1, 2 or 3',
    'any.required': 'Category is required',
  })

  static restaurantId = Joi.number().required().messages({
    'number.base': 'Restaurant ID must be a number',
    'number.empty': 'Restaurant ID cannot be empty',
    'any.required': 'Restaurant ID is required',
  })
}
