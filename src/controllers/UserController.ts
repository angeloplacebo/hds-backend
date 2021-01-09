import { Response, Request } from 'express'
import bcryptjs from 'bcryptjs'

import userModel from '../models/User'
import { loginValidation, registerValidation } from '../validation'

const UserController = {

  async create(req: Request, res: Response) {

    //Validate data before create
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).send(error?.details[0].message)

    //check if the user already exists
    const emailExist = await userModel.findOne({ email: req.body.email })
    if (emailExist) return res.status(400).send('Email already exist')

    //hash password
    const salt = await bcryptjs.genSalt()
    const hashPassword = await bcryptjs.hash(req.body.password, salt)

    const { name, email } = req.body
    const user = new userModel({
      name,
      email,
      password: hashPassword
    })

    try {
      const savedUser = await userModel.create(user)
      res.send({ user: savedUser._id })
    } catch (err) {
      res.send(err)
    }
  },

  async login(req: Request, res: Response) {

    //Validate data before create
    const { error } = loginValidation(req.body)
    if (error) return res.status(400).send(error?.details[0].message)

    //check if the user exists
    const user = await userModel.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('Email is not found')

    const validPass = await bcryptjs.compare(req.body.password, user.password)

    if (!validPass) return res.status(400).send("Invalid password")

    res.send("logged in")

  }
}

export default UserController