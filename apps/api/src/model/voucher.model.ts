import { Voucher } from '@prisma/client';

export type GetVouchersByUserIdRquest = {
  userId: string;
}

export const toVouchersResponse = (events: Voucher[]) => {
  const event = events.map((vc) => ({
    id: vc.id,
    name: vc.name,
    type: vc.type,
    points: vc.points,
    discount: vc.discount,
    expAt: vc.expAt,
  }))
  
  return event
}
