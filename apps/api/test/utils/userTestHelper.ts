import prisma from '@/prisma';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';

export class UserTestHelper {

  static async add() {
    await prisma.user.create({
      data: {
        id: 'user-uuidv4',
        firstName: 'test',
        lastName: 'test',
        email: 'test@gmail.com',
        password: await bcrypt.hash('secret', 10),
        updatedAt: '2024-04-19T02:07:08.262Z',
        roleId: 1
      }
    })
  }

  static async get(id: string) : Promise<User> {
    const user = await prisma.user.findUnique({
      where: {
        id: id
      }
    })

    return user!
  }

  static async delete() {
    await prisma.$queryRaw`DELETE FROM users WHERE email LIKE 'test%'`;
  }

}
