import { CreateUserRquest } from '@/model/user.model';
import { UserService } from '@/services/user.service';
import { VoucherService } from '@/services/voucher.service';
import { UserRequest } from '@/type/userRequest';
import { NextFunction, Request, Response } from 'express';

export default class UserController {

  async postUser(req: Request, res: Response, next: NextFunction) {

    try {

      const request = req.body as CreateUserRquest;

      if(request.refReferral) {
        await UserService.verifyReferral({ referral: request.refReferral })
      }

      const user = await UserService.addUser(request);

      if(request.refReferral) {
        const ownerReferral = await UserService.getUserIdByReferral({ referral: request.refReferral })
        await VoucherService.addDiscountToSomeoneUsedReferral({ userId: user.id })
        await VoucherService.addPointToOwnerReferral({ userId: ownerReferral.id })
      }

      res.status(201).send({
        status: 'success',
        data: user
      });

    } catch (e) {

      next(e);

    }

  }

  async getVouchersByUserId(req: UserRequest, res: Response, next: NextFunction) {

    try {
      const id = req.user?.id!
  
      const vouchers = await VoucherService.getVouchersById({ userId: id });

      res.status(200).send({
        data: vouchers
      });
    } catch (e) {
      next(e);
    }

  }

}
