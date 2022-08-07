import 'dotenv/config'
import { auth } from 'express-openid-connect'

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.OAUTH2_SECRET,
    baseURL: 'http://localhost:4156',
    clientID: 'F75AOHTqChpG0xRT4469JDUmLYwwx6ma',
    issuerBaseURL: 'https://dev-gbeqmpe4.us.auth0.com',
}

export const oauth2 = auth(config)
