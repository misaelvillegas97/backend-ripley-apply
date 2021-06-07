import Router from 'express-promise-router'
import { create, list, searchById } from '~/packages/api/resources/recipient/controller'

const router = Router()

router.route('/').get(list)
router.route('/').post(create)
router.route('/search').get(searchById)

export default router
