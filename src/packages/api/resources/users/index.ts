import Router from 'express-promise-router'
import { create, list, login } from '~/packages/api/resources/users/controller'

const router = Router()

router.route('/').get(list)
router.route('/login').get(login)
router.route('/').post(create)

export default router
