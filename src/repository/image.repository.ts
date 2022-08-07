import fileUpload from 'express-fileupload'
import { getConnection } from '../app-data-source'
import { Image } from '../entity/image.entity'
import { ImageFilterRequest } from '../type/image-filter-request.type'

async function getImageModel(imageId: number) {
    const connection = await getConnection()
    const repo = connection.getRepository(Image)

    return repo.findOneByOrFail({ id: imageId })
}

async function filterImages(imageFilterRequest?: ImageFilterRequest) {
    const connection = await getConnection()
    const query = connection
        .getRepository(Image)
        .createQueryBuilder('image')
        .leftJoinAndSelect('image.tags', 'tag')

    if (!imageFilterRequest) {
        return query.getMany()
    }

    if (imageFilterRequest.tagIds) {
        const tagIdsJoined = imageFilterRequest.tagIds.join(',')

        query.andWhere(
            'image.id IN ' +
                query
                    .subQuery() // Subquery to select imageIds that have a relationship with any of the given tagIds
                    .select('imageSub.id')
                    .from(Image, 'imageSub')
                    .innerJoin('imageSub.tags', 'tagSub')
                    .where(`tagSub.id IN (${tagIdsJoined})`) // TODO. Investigate why this fails when using the format: .where(`tag2.id IN (:tagIdsJoined})`, {tagIdsJoined})
                    .getQuery()
        )
    }

    if (imageFilterRequest.createdAtFrom) {
        query.andWhere('image.createdAt >= :createdAtFrom', {
            createdAtFrom: imageFilterRequest.createdAtFrom,
        })
    }

    if (imageFilterRequest.createdAtFrom) {
        query.andWhere('image.createdAt <= :createdAtTo', {
            createdAtTo: imageFilterRequest.createdAtTo,
        })
    }

    return query.getMany()
}

async function createImage(requestImage: Image) {
    const connection = await getConnection()
    const repo = connection.getRepository(Image)

    const createdImage = repo.create(requestImage)

    return repo.save(createdImage)
}

function storeImage(file: fileUpload.UploadedFile) {
    // TODO: Replace with cloud storage solution
    file.mv(`${__dirname}/../../public/${file.name}`, (err: Error) => {
        if (err) {
            throw new Error(`Error saving image file: ${err.message}`)
        }
    })
}

async function updateImage(imageId: number, requestImage: Image) {
    const connection = await getConnection()
    const repo = connection.getRepository(Image)

    // Need to request image before update, as need to set every field of the image with a
    // repo.save() call. repo.update() can update subset of fields only so would not require
    // loading model, but does not work with models with relationships
    const storedImage = await repo.findOneBy({
        id: imageId,
    })

    const updatedImage = repo.create({
        ...storedImage,
        ...requestImage,
        modifiedAt: new Date(),
    })

    await repo.save(updatedImage)

    // Need to request image again after save. Collection returned from save(updatedImage) does not
    // include full tag models, only the id field of tags
    return repo.findOneBy({ id: imageId })
}

export const imageRepository = {
    getImageModel,
    filterImages,
    createImage,
    storeImage,
    updateImage,
}
