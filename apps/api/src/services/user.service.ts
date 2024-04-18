import InvariantError from '@/exceptions/InvariantError';
import { CreateUserRquest, UserResponse, toUserReponse } from '@/model/user.model';
import prisma from '@/prisma';
import { referralCode } from '@/utils/referralCode';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

export class UserService {

  static async addUser(req: CreateUserRquest) : Promise<UserResponse> {

    const countSameEmail = await prisma.user.count({
      where: { email: req.email },
    })

    if (countSameEmail != 0) {
      throw new InvariantError('Email already exists!');
    }

    req.id = `user-${uuid()}`;
    req.password = await bcrypt.hash(req.password, 10);
    req.referral = referralCode(6);
    req.updatedAt = new Date().toISOString();
    req.roleId = 1;

    const user = await prisma.user.create({
      data: req
    })

    return toUserReponse(user);
  }

}
