import { Router } from 'express'
import * as pagesController from '../controllers/pagesControllers.js'

const router = Router()

router.get("/", pagesController.home)
router.get("/board/:id", pagesController.board)

export default router