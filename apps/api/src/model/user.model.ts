import { User } from '@prisma/client';

export type CreateUserRquest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  refReferral?: string;
  roleId: number;
}

export type UserResponse = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  referral?: string;
  role?: string;
  token?: string;
}

export const toUserResponse = (user : User) : UserResponse => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    referral: user.referral!,
  }
}

export const toUserAdminResponse = (user : User) : UserResponse => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  }
}

export type LoginUserRequest = {
  email: string;
  password: string;
}

export type UpdateUserRequest = {
  id: string;
  token?: string;
}

export const toPayloadToken = (user : User) : UserResponse => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.roleId == 1 ? 'user' : 'admin',
    referral: user.referral ? user.referral : '',
  }
}
