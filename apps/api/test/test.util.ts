import prisma from '@/prisma';

export class UserTestHelper {

  static async delete() {
    await prisma.user.delete({
      where: { email: 'test@gmail.com' }
    })
  }

}
