import 'dotenv/config'
import { NextFunction, Request, Response } from 'express'
import { RequestHeaderType } from '../type/request-header.type'

export function authenticate(req: Request, res: Response, next: NextFunction) {
    const xApiKey = req.headers[RequestHeaderType.XApiKey]
    if (typeof xApiKey !== 'string') {
        throw new Error('Authentication Error. Missing x-api-key header')
    }

    const clientId = req.headers[RequestHeaderType.ClientId]
    if (typeof clientId !== 'string') {
        throw new Error('Authentication Error. Missing client-id header')
    }

    try {
        credentialsCheck(xApiKey as string, clientId as string)

        next()
    } catch (err) {
        next(err)
    }
}

export function credentialsCheck(
    requestApiKey: string,
    requestClientId: string
) {
    const expectedApiKey = process.env.API_KEY
    const expectedClientId = process.env.CLIENT_ID

    if (
        expectedApiKey !== requestApiKey ||
        requestClientId !== expectedClientId
    ) {
        throw new Error('Authentication Error. Invalid x-api-key')
    }
}
