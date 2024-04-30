import InvariantError from '@/exceptions/InvariantError';
import {
  CreateUserRquest,
  LoginUserRequest,
  UpdateUserRequest,
  UserResponse,
  toUserAdminResponse,
  toUserResponse 
} from '@/model/user.model';
import prisma from '@/prisma';
import { referralCode } from '@/utils/referralCode';
import { Role, User } from '@prisma/client';
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
    req.updatedAt = new Date().toISOString();
    req.roleId = +req.roleId
    req.roleId == 1 ? req.referral = referralCode(6) : '';

    const user = await prisma.user.create({
      data: req
    })

    if (user.referral) {
      return toUserResponse(user)
    } else {
      return toUserAdminResponse(user)
    }

  }

  static async getUserByEmail(req: LoginUserRequest) : Promise<User & { role: Role }> {

    let user = await prisma.user.findUnique({
      where: {
        email: req.email 
      },
      include: {
        role: true
      }
    });

    if (!user) {
      throw new InvariantError('Email or password is wrong');
    }

    const isPasswordValid = await bcrypt.compare(req.password, user.password);
    if (!isPasswordValid) {
      throw new InvariantError('Email or password is wrong');
    }

    return user;

  }

  static async patchUserToken(req: UpdateUserRequest) : Promise<UserResponse> {

    const user = await prisma.user.update({
      where: { id: req.id },
      data: { token: req.token }
    })

    const newUser = toUserResponse(user);

    return newUser;

  }

  static async deleteUserToken(req: UpdateUserRequest) : Promise<void> {

    await prisma.user.update({
      where: {
        id: req.id
      },
      data: {
        token: null
      }
    })

  }

}
