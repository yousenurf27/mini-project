import prisma from '@/prisma';
import { Voucher } from '@prisma/client';

export class VoucherTestHelper {

  static async get(): Promise<Voucher[]> {
    const data = await prisma.voucher.findMany({});

    return data
  }

  static async getByUserId(userId: string) : Promise<Voucher> {
    const data = await prisma.voucher.findFirst({
      where: {
        userId: userId
      }
    })

    return data!
  }

  static async delete() {
    await prisma.voucher.deleteMany({});
  }

}
