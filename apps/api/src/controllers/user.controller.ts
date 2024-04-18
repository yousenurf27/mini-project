import { CreateUserRquest } from '@/model/user.model';
import { UserService } from '@/services/user.service';
import { NextFunction, Request, Response } from 'express';

export default class UserController {

  async postUser(req: Request, res: Response, next: NextFunction) {
    try {
      const request = req.body as CreateUserRquest;
      const response = await UserService.addUser(request);
  
      res.status(201).send({
        status: 'success',
        data: response
      });
    } catch (e) {
      next(e);
    }
  }

}
