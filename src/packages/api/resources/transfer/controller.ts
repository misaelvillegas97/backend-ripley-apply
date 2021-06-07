import { Bank } from './../../../database/models/bank'
import { Recipient } from '~/packages/database/models/recipient'
import { NextFunction, Request, Response } from 'express'
import * as httpStatus from 'http-status'
import { getConnection, InsertResult } from 'typeorm'
import { Transfer } from '~/packages/database/models/transfer'
// import { Forbidden } from '../../helpers/exceptions/forbidden'

export const list = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const transfers: Transfer[] = await getConnection()
      .getRepository(Transfer)
      .createQueryBuilder('transfers')
      .leftJoinAndSelect('transfers.id_account', 'account')
      .innerJoinAndMapOne('account.id_recipient', Recipient, 'recipient', 'account.id_recipient = recipient.id')
      .innerJoinAndMapOne('account.id_bank', Bank, 'bank', 'account.id_bank = bank.id')
      .getMany()

    return res.status(httpStatus.OK).send(transfers)
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
  }
}

export const create = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const params = req.query
    if (!params.id_user) {
      return res.status(httpStatus.UNAUTHORIZED).send('401: UNAUTHORIZED')
    }

    const transfer = req.body as Transfer

    const response = (await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Transfer)
      .values(transfer)
      .execute()) as InsertResult

    return res.status(httpStatus.OK).send(response.generatedMaps[0])
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
  }
}
