import { NextFunction, Request, Response } from 'express'

async function getPong(req: Request, res: Response, next: NextFunction) {
    try {
        res.json('pong')
    } catch (err) {
        console.error('Error while getting pong', err.message)
        next(err)
    }
}

export const pingController = {
    getPong,
}
