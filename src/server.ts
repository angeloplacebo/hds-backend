import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import * as dotenv from 'dotenv'

import dataRoute from './routes/data'
import authRoute from './routes/auth'

dotenv.config()

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.DATABASE_URL!)

const db = mongoose.connection
db.on('error', (error)=> console.error(error))
db.once('open', ()=> console.log('Connected to Database'))

const corsOpts = cors()

const app = express()

app.use(corsOpts)

app.use(express.json())

app.use(dataRoute)
app.use('/api/user', authRoute)

app.listen(process.env.PORT || 3333, ()=> console.log('Server started at port:',process.env.PORT))