import { CreateUserRquest } from '@/model/user.model';
import { UserService } from '@/services/user.service';
import { VoucherService } from '@/services/voucher.service';
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

}
