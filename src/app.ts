import express from 'express'
import pingRouter from './route/ping.route'

const app = express()
const port = 4156

app.use('/ping', pingRouter)

app.listen(port, () => {
    console.log(`Tagged image service listening on port: ${port}.`)
})
