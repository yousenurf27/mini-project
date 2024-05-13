import { NextFunction, Response } from 'express';
import TokenManager from '@/tokenize/tokenManager';
import { UpdateUserRequest } from '@/model/user.model';
import { UserRequest } from '@/type/userRequest';
import fs from 'fs'

export const verifyToken = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const { file } = req
  try {
    const token = req.header('token')?.replace('Bearer', '').trim();

    if (!token) {
      if(file) fs.unlinkSync(file.path!)
      return res.status(401).send({
        status: 'fail',
        message: 'Unauthorized',
        filePath: file?.path
      });
    }

    const verifiedUser = TokenManager.verifyToken(token);
    if (!verifiedUser) {
      if(file) fs.unlinkSync(file.path!)
      return res.status(403).send({
        status: 'fail',
        message: 'Token is invalid',
        filePath: file?.path
      });
    }

    req.user = verifiedUser as UpdateUserRequest;

    next();
  } catch (e) {
    const error = e as Error;
    if(file) fs.unlinkSync(file.path!)
    res.status(403).send({
      status: 'fail',
      message: 'Token is invalid',
      filePath: file?.path
    })
  }
}