import { getConnection } from '../app-data-source'
import { Tag } from '../entity/tag.entity'

async function getTags() {
    const connection = await getConnection()
    const repo = connection.getRepository(Tag)

    return repo.find()
}

async function createTag(requestTag: Tag) {
    const connection = await getConnection()
    const repo = connection.getRepository(Tag)

    const createdTag = repo.create(requestTag)

    return repo.save(createdTag)
}

export const tagRepository = {
    getTags,
    createTag,
}
