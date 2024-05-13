import prisma from '@/prisma';

export class EventTestHelper {

  static async addEvent(req: any) {
    await prisma.event.create({
      data: req
    })
  }

  static async delete() {
    await prisma.$queryRaw`DELETE FROM events WHERE userId = 'user-uuidv4'`;
  }

}