import { Tag } from '../entity/tag.entity'
import { tagRepository } from '../repository/tag.repository'

async function getTags() {
    return tagRepository.getTags()
}

async function createTag(tag: Tag) {
    return tagRepository.createTag(tag)
}

export const tagService = {
    getTags,
    createTag,
}
