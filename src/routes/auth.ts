import {Router} from 'express';

import UserController from '../controllers/UserController'
import auth from './verifyToken';

const routes = Router()

routes.post('/register', UserController.create)

routes.post('/login', UserController.login)

routes.get('/verify', auth, (req,res)=>{
  res.status(200).send("Access Granted")
})

export default routes    