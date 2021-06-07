import { Request, Response } from 'express'
import * as httpStatus from 'http-status'
import { getConnection, getRepository, InsertResult } from 'typeorm'
import { Recipient } from '~/packages/database/models/recipient'
// import { Forbidden } from '../../helpers/exceptions/forbidden'

export const list = async (req: Request, res: Response): Promise<unknown> => {
  try {
    const params = req.query
    if (!params.id_user) {
      return res.status(httpStatus.UNAUTHORIZED).send('401: UNAUTHORIZED')
    }

    const recipients: Recipient[] = await getRepository(Recipient)
      .createQueryBuilder('recipients')
      .innerJoinAndSelect('recipients.id_user', 'users')
      .leftJoinAndSelect('recipients.recipient_bank', 'recipient_bank')
      .leftJoinAndSelect('recipient_bank.id_bank', 'bank')
      .where('recipients.id_user = :idUser', { idUser: params.id_user })
      .getMany()

    return res.status(httpStatus.OK).send(recipients)
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
  }
}

export const searchById = async (req: Request, res: Response): Promise<unknown> => {
  try {
    const params = req.query
    if (!params.id_user) {
      return res.status(httpStatus.UNAUTHORIZED).send('401: UNAUTHORIZED')
    }

    const recipient: Recipient = await getRepository(Recipient)
      .createQueryBuilder('recipients')
      .innerJoinAndSelect('recipients.id_user', 'users')
      .leftJoinAndSelect('recipients.recipient_bank', 'recipient_bank')
      .leftJoinAndSelect('recipient_bank.id_bank', 'bank')
      .where('recipients.id_user = :idUser', { idUser: params.id_user })
      .andWhere('recipients.id = :id', { id: params.id_recipient })
      .getOne()

    return res.status(httpStatus.OK).send(recipient)
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
  }
}

export const create = async (req: Request, res: Response): Promise<unknown> => {
  try {
    const params = req.query
    if (!params.id_user) {
      return res.status(httpStatus.UNAUTHORIZED).send('401: UNAUTHORIZED')
    }
    const recipient = req.body as Recipient

    const validation = await getConnection()
      .getRepository(Recipient)
      .findOne({ id_user: recipient.id_user, rut: recipient.rut })

    if (validation) {
      await getConnection()
        .createQueryBuilder()
        .update(Recipient)
        .set(recipient)
        .where('recipients.id_user = :idUser', { idUser: params.id_user })
        .andWhere('recipients.rut = :rut', { rut: recipient.rut })
        .execute()

      return res.status(httpStatus.OK).send(validation)
    }

    const response = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Recipient)
      .values(recipient)
      .execute() as InsertResult

    return res.status(httpStatus.OK).send(response.generatedMaps[0])
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
  }
}