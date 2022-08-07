import { NextFunction, Request, Response } from 'express'
import { UploadedFile } from 'express-fileupload'
import { imageService } from '../service/image.service'
import { ImageFilterRequest } from '../type/image-filter-request.type'
import { MimeType } from '../type/mime-type.type'
import { RequestHeaderType } from '../type/request-header.type'

async function getImage(req: Request, res: Response, next: NextFunction) {
    try {
        const contentType = req.headers[RequestHeaderType.ContentType]

        switch (contentType) {
            case MimeType.ApplicationJson: {
                console.log('Content-type application/json requested')
                res.json(
                    await imageService.getImageModel(
                        Number.parseInt(req.params.id)
                    )
                )
                break
            }
            case MimeType.Image: {
                console.log('Content-Type image requested')
                res.download(
                    await imageService.getImageFilePath(
                        Number.parseInt(req.params.id)
                    )
                )
                break
            }
            default: {
                throw Error(
                    "Get image supports content-type of 'application/json' or 'image"
                )
            }
        }
    } catch (err) {
        console.error('Error while getting image', err.message)
        next(err)
    }
}

async function searchImages(req: Request, res: Response, next: NextFunction) {
    try {
        res.json(
            await imageService.filterImages(
                req.query.filter as ImageFilterRequest
            )
        )
    } catch (err) {
        console.error('Error while searching images', err.message)
        next(err)
    }
}

async function createImage(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.files.file) {
            throw Error(
                'Create image requires a file in the file field of multipart form'
            )
        }

        const files = req.files.file as UploadedFile[]
        if (files.length > 1) {
            throw Error('File field accepts a single file only')
        }

        const image = await imageService.createImage(
            req.files.file as UploadedFile
        )

        res.json(image)
    } catch (err) {
        console.error('Error while creating image', err.message)
        next(err)
    }
}

async function updateImage(req: Request, res: Response, next: NextFunction) {
    try {
        res.json(
            await imageService.updateImage(
                Number.parseInt(req.params.id),
                req.body
            )
        )
    } catch (err) {
        console.error('Error while updating image', err.message)
        next(err)
    }
}

export const imageController = {
    getImage,
    searchImages,
    createImage,
    updateImage,
}
