import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import createConnection from './database'
import './database'
import router from './routes'
import AppError from './errors/AppError'



createConnection()
const app = express()
app.use(express.json())
app.use(router)

app.use((err: Error, request: Request, res: Response, _next: NextFunction) => {
    if(err instanceof(AppError)) {
        return res.status(err.statusCode).json({
            message: err.message
        })
    }

    return res.status(500).json({
        message: 'Internal server error'
    })
})

export default app