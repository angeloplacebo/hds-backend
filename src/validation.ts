import Joi from '@hapi/joi'

//Validation
const registerSchema = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required()
})

const loginSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required()
})


const registerValidation = (data = {}) => {
  return registerSchema.validate(data)
}

const loginValidation = (data = {}) => {
  return loginSchema.validate(data)
}

export { registerValidation, loginValidation }