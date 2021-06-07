import Router from 'express-promise-router'
import { list } from '~/packages/api/resources/bank/controller'

const router = Router()

router.route('/').get(list)

export default router
