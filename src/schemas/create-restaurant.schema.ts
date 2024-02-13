import * as Joi from 'joi'

export class CreateRestaurantSchema {
  static restaurantName = Joi.string().min(3).max(100).required().messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name cannot be empty',
    'string.min': 'Name must have at least {#limit} characters',
    'string.max': 'Name must have at most {#limit} characters',
    'any.required': 'Name is required',
  })

  static phone = Joi.string().max(20).required().messages({
    'string.base': 'Phone must be a string',
    'string.empty': 'Phone cannot be empty',
    'any.required': 'Phone is required',
    'string.max': 'Phone must have at most {#limit} characters',
  })

  static email = Joi.string().required().max(100).email().label('E-mail').messages({
    'string.base': 'Email must be a string',
    'string.empty': 'Email cannot be empty',
    'string.email': 'Email must be a valid email',
    'any.required': 'Email is required',
    'string.max': 'Email must have at most {#limit} characters',
  })

  static street = Joi.string().min(3).max(255).optional().messages({
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
