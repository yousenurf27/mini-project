import prisma from '@/prisma';
import { nextThreeMonths } from '@/utils/dateNextMonth';
import { v4 as uuid } from 'uuid';

export class VoucherService {

  static async addDiscountToSomeoneUsedReferral(req: { userId: string }) : Promise<void> {

    await prisma.voucher.create({
      data: {
        id: `voucher-${uuid()}`,
        name: 'Voucher using referral',
        type: 'discount',
        discount: 10,
        updatedAt: new Date().toISOString(),
        userId: req.userId,
        expAt: nextThreeMonths()
      }
    })

  }

  static async addPointToOwnerReferral(req: { userId: string }) : Promise<void> {

    const hasVoucherTypePoint = await prisma.voucher.findFirst({
      where: {
        type: 'point'
      }
    })

    if(hasVoucherTypePoint) {
      await prisma.voucher.update({
        where: {
          id: hasVoucherTypePoint.id,
        },
        data: {
          points: hasVoucherTypePoint.points! + 10000
        }
      })

      return
    }

    await prisma.voucher.create({
      data: {
        id: `voucher-${uuid()}`,
        name: 'Points from used referral by someone',
        type: 'point',
        points: 10000,
        updatedAt: new Date().toISOString(),
        userId: req.userId,
        expAt: nextThreeMonths()
      }
    })

  }

}
