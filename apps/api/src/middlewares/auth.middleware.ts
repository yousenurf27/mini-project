import { NextFunction, Response } from 'express';
import TokenManager from '@/tokenize/tokenManager';
import { UpdateUserRequest } from '@/model/user.model';
import { UserRequest } from '@/type/userRequest';

export const verifyToken = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header('token')?.replace('Bearer', '').trim();

    if (!token) {
      return res.status(401).send({
        status: 'fail',
        message: 'Unauthorized'
      });
    }

    const verifiedUser = TokenManager.verifyToken(token);
    if (!verifiedUser) {
      return res.status(403).send({
        status: 'fail',
        message: 'Token is invalid'
      });
    }

    req.user = verifiedUser as UpdateUserRequest;

    next();
  } catch (e) {
    const error = e as Error;
    res.status(403).send({
      status: 'fail',
      message: 'Token is invalid'
    })
  }
}