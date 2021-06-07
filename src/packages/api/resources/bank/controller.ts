import { NextFunction, Request, Response } from 'express'
import * as httpStatus from 'http-status'
import { getConnection } from 'typeorm'
import { Bank } from '~/packages/database/models/bank'
// import { Forbidden } from '../../helpers/exceptions/forbidden'

export const list = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const banks: Bank[] = await getConnection().getRepository(Bank).createQueryBuilder('bank').getMany()

    return res.status(httpStatus.OK).send(banks)
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
  }
}
