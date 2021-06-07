import * as express from 'express'
import userRouter from '~/packages/api/resources/users/index'
import bankRouter from '~/packages/api/resources/bank/index'
import recipientRouter from '~/packages/api/resources/recipient/index'
import recipientBankRouter from '~/packages/api/resources/recipientBank/index'
import transferRouter from '~/packages/api/resources/transfer/index'

const router = express.Router()

router.use('/users', userRouter)
router.use('/bank', bankRouter)
router.use('/recipient', recipientRouter)
router.use('/recipientBank', recipientBankRouter)
router.use('/transfer', transferRouter)

export default router
