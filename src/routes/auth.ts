import {Router} from 'express';

import UserController from '../controllers/UserController'

const routes = Router()

routes.post('/register',UserController.create)

routes.post('/login', UserController.login)

export default routes    