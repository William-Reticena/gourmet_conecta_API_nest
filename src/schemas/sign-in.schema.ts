import * as Joi from 'joi'

export class SignInSchema {
  static email = Joi.string().email().required().messages({
    'string.base': 'Email should be a type of text',
    'string.empty': 'Email cannot be an empty field',
    'string.email': 'Email format is invalid',
    'any.required': 'Email is a required field',
  })

  static password = Joi.string().min(6).max(20).required().messages({
    'string.base': 'Password should be a type of text',
    'string.empty': 'Password cannot be an empty field',
    'string.min': 'Password should have a minimum length of {#limit}',
    'string.max': 'Password should have a maximum length of {#limit}',
    'any.required': 'Password is a required field',
  })
}
