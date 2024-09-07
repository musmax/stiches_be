import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import notFoundAPIHandler from './app/middlewares/notFoundAPIHandler'
import router from './app/routes'

const app: Application = express()

//parsers
app.use(express.json())
app.use(cookieParser())

/** use for credentials: true */
// app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));

/** use for credentials: false */
app.use(cors())

// application routes
app.use('/api/v1', router)

// welcome route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Stitch Server')
})

app.use(express.urlencoded({extended:true}));

// global error handler
app.use(globalErrorHandler)

//Not Found API Route Handler
app.use(notFoundAPIHandler)

export default app
