import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import helmet from 'helmet'
import colors from 'colors'
import fileUpload from 'express-fileupload'
import morgan from 'morgan'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config()

connectDB()

const app = express()
app.use(fileUpload())

app.use(express.json())
app.use(helmet())
app.use(cors())

const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
  },
})

global.io = io

io.on('connection', (socket) => {
  console.log('a user connected')
  socket.emit('successConnection', 'Server & Client are connected successfully')

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

httpServer.listen(
  PORT,
  console.log(
    `Server running ${process.env.NODE_ENV} mode on post ${PORT}`.yellow.bold
  )
)
