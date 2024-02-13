import * as Joi from 'joi'

export class CreateUserSchema {
  static firstName = Joi.string().min(3).max(50).required().messages({
    'string.base': 'First name must be a string',
    'string.empty': 'First name cannot be empty',
    'string.min': 'First name must have at least {#limit} characters',
    'string.max': 'First name must have at most {#limit} characters',
    'any.required': 'First name is required',
  })

  static lastName = Joi.string().min(3).max(50).required().messages({
    'string.base': 'Last name must be a string',
    'string.empty': 'Last name cannot be empty',
    'string.min': 'Last name must have at least {#limit} characters',
    'string.max': 'Last name must have at most {#limit} characters',
    'any.required': 'Last name is required',
  })

  static email = Joi.string().required().email().label('E-mail').messages({
    'string.base': 'Email must be a string',
    'string.empty': 'Email cannot be empty',
    'string.email': 'Email must be a valid email',
    'any.required': 'Email is required',
  })

  static password = Joi.string().required().messages({
    'string.base': 'Password must be a string',
    'string.empty': 'Password cannot be empty',
    'any.required': 'Password is required',
  })

  static type = Joi.number().valid(1, 2, 3).required().messages({
    'number.base': 'Type must be a number',
    'number.empty': 'Type cannot be empty',
    'any.required': 'Type is required',
    'any.only': 'Type must be 1, 2 or 3',
  })
}
