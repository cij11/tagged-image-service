import { Router } from 'express'

import { tagController } from '../controller/tag.controller'

const router = Router()

router.get('/', tagController.getTags)

router.post('/', tagController.createTag)

export default router
