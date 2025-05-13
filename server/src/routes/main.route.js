import express from 'express'
import { checkGrammer,paraphrase } from '../controller/main.controller.js'
const router = express.Router()

router.post('/check',checkGrammer)
router.post('/paraphrase',paraphrase)


export default router