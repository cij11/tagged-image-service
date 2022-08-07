import express from 'express'
import fileUpload from 'express-fileupload'
import { requiresAuth } from 'express-openid-connect'
import { oauth2 } from './middleware/oauth-2.middleware'
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
    express.json(), // Use express.json to support parsing of body to json
    oauth2
)

app.listen(port, () => {
    console.log(`Tagged image service listening on port: ${port}.`)
})

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
})

app.get('/callback', (req, res) => {
    res.send('logged in')
})

// app.get('/profile', requiresAuth(), (req, res) => {
//     res.send(JSON.stringify(req.oidc.user))
// })

app.use(requiresAuth())

app.use('/tags', tagRouter)

app.use('/images', imageRouter)
