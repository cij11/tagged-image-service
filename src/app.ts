import express from 'express'
import fileUpload from 'express-fileupload'
import imageRouter from './route/image.route'
import pingRouter from './route/ping.route'
import tagRouter from './route/tag.route'

const app = express()
const port = 4156

app.use('/ping', pingRouter)

app.use(
    fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
        tempFileDir: 'uploads',
    }), // Use fileupload to support uploading image files
    express.json() // Use express.json to support parsing of body to json
)

app.listen(port, () => {
    console.log(`Tagged image service listening on port: ${port}.`)
})

app.use('/tags', tagRouter)

app.use('/images', imageRouter)
