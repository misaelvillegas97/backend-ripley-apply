import Router from 'express-promise-router'
import { create, list } from '~/packages/api/resources/recipientBank/controller'

const router = Router()

router.route('/').get(list)
router.route('/').post(create)

export default router
