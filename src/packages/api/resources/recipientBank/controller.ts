import { Request, Response } from 'express'
import * as httpStatus from 'http-status'
import { getConnection, InsertResult } from 'typeorm'
import { RecipientBank } from '~/packages/database/models/recipientBank'
// import { Forbidden } from '../../helpers/exceptions/forbidden'

export const list = async (req: Request, res: Response): Promise<Response> => {
  try {
    const params = req.query
    if (!params.id_user) {
      return res.status(httpStatus.UNAUTHORIZED).send('401: UNAUTHORIZED')
    }

    let recipientBanks: unknown

    if (params.id_recipient) {
      recipientBanks = await getConnection()
        .getRepository(RecipientBank)
        .createQueryBuilder('recipient_bank')
        .leftJoinAndSelect('recipient_bank.id_bank', 'bank')
        .where('recipient_bank.id_recipient = :id_recipient', { id_recipient: params.id_recipient })
        .getMany()
    } else {
      recipientBanks = await getConnection()
        .getRepository(RecipientBank)
        .createQueryBuilder('recipient_bank')
        .leftJoinAndSelect('recipient_bank.id_bank', 'bank')
        .getMany()
    }

    return res.status(httpStatus.OK).send(recipientBanks)
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
  }
}

export const create = async (req: Request, res: Response): Promise<Response> => {
  try {
    const params = req.query
    if (!params.id_user) {
      return res.status(httpStatus.UNAUTHORIZED).send('401: UNAUTHORIZED')
    }
    const recipientBank = req.body as RecipientBank

    const validation = await getConnection()
      .getRepository(RecipientBank)
      .findOne({
        id_recipient: recipientBank.id_recipient,
        id_bank: recipientBank.id_bank,
        account_type: recipientBank.account_type
      })

    if (validation) {
      await getConnection()
        .createQueryBuilder()
        .update(RecipientBank)
        .set(recipientBank)
        .where('recipient_bank.id_recipient = :id_recipient', { id_recipient: recipientBank.id_recipient })
        .andWhere('recipient_bank.id_bank = :id_bank', { id_bank: recipientBank.id_bank })
        .andWhere('recipient_bank.account_type = :account_type', { account_type: recipientBank.account_type })
        .execute()

      return res.status(httpStatus.OK).send(validation)
    }

    const response = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(RecipientBank)
      .values(recipientBank)
      .execute() as InsertResult

    return res.status(httpStatus.OK).send(response.generatedMaps[0])
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
  }
}