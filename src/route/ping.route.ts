import { Router } from 'express'
import { pingController } from '../controller/ping.controller'

const router = Router()

router.get('/', pingController.getPong)

export default router
