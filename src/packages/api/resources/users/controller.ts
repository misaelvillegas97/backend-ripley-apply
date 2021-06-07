import { NextFunction, Request, Response } from 'express'
import * as httpStatus from 'http-status'
import { getConnection } from 'typeorm'
import { User } from '~/packages/database/models/user'
// import { Forbidden } from '../../helpers/exceptions/forbidden'

export const list = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    let params = req.query
    let users;
    if (params.rut) {
      users = await getConnection()
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.rut = :rut', { rut: params.rut })
      .getOne()
    } else {
      users = await getConnection()
        .getRepository(User)
        .createQueryBuilder('user')
        .getMany()
    }

    return res.status(httpStatus.OK).send(users)
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
  }
}

export const create = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const result = await getConnection().createQueryBuilder()
    .insert()
    .into(User)
    .values(req.body as User)
    .onConflict(`(rut) DO NOTHING`)
    .execute();

    const user: User = result.generatedMaps[0] as User;
    return res.status(httpStatus.CREATED).send(user)
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
  }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.OK).json({ hello: 'world' })
}
