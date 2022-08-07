import fileUpload from 'express-fileupload'
import { Image } from '../entity/image.entity'
import { imageRepository } from '../repository/image.repository'

async function getImageModel(imageId: number) {
    return imageRepository.getImageModel(imageId)
}

async function getImageFilePath(imageId: number) {
    const image = await imageRepository.getImageModel(imageId)

    return `${__dirname}/../../public/${image.filename}`
}

async function createImage(file: fileUpload.UploadedFile) {
    const filename = file.name

    imageRepository.storeImage(file)

    const image: Image = {
        filename: filename,
        tags: [],
        createdAt: new Date(),
        modifiedAt: new Date(),
    }

    return imageRepository.createImage(image)
}

async function updateImage(imageId: number, image: Image) {
    return imageRepository.updateImage(imageId, image)
}

export const imageService = {
    getImageModel,
    getImageFilePath,
    createImage,
    updateImage,
}
