import { User } from '@prisma/client';

export type CreateUserRquest = {
  id: string,
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  referral?: string;
  updatedAt: string;
  roleId: number;
}

export type UserResponse = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  token?: string;
}

export const toUserReponse = (user : User) : UserResponse => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  }
}