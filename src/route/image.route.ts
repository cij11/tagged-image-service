import { Router } from 'express'

import { imageController } from '../controller/image.controller'

const router = Router()

router.post('/', imageController.createImage)

router.get('/:id', imageController.getImage)

router.patch('/:id', imageController.updateImage)

export default router
