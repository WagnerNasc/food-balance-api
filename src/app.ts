import express, { Request, Response } from 'express'
import { env } from './env'

const app = express()
app.use(express.json())

app.listen(env.PORT, () => {
  console.log(`〰 Server running on port ${env.PORT}`)
})

app.get('/', function (req: Request, res: Response): void {
  res.send('Hello World')
})
