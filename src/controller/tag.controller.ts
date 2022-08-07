import { NextFunction, Request, Response } from 'express'
import { tagService } from '../service/tag.service'

async function getTags(req: Request, res: Response, next: NextFunction) {
    try {
        res.json(await tagService.getTags())
    } catch (err) {
        console.error('Error while getting tags', err.message)
        next(err)
    }
}

async function createTag(req: Request, res: Response, next: NextFunction) {
    try {
        const tag = req.body
        res.json(await tagService.createTag(tag))
    } catch (err) {
        console.error('Error while creating tag', err.message)
        next(err)
    }
}

export const tagController = {
    getTags,
    createTag,
}
