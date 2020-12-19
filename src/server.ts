import express from 'express'
import mongoose from 'mongoose'

import * as dotenv from 'dotenv'

dotenv.config()

import routes from './routes'

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(process.env.DATABASE_URL!)

const db = mongoose.connection
db.on('error', (error)=> console.error(error))
db.once('open', ()=> console.log('Connected to Database'))

const app = express()

app.use(express.json())

app.use(routes)

app.listen(process.env.PORT || 3333, ()=> console.log('Server started at port:',process.env.PORT))