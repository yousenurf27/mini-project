import { LoginUserRequest, UpdateUserRequest, UserResponse, toPayloadToken } from '@/model/user.model';
import { UserService } from '@/services/user.service';
import TokenManager from '@/tokenize/tokenManager';
import { UserRequest } from '@/type/userRequest';
import { NextFunction, Request, Response } from 'express';

export default class AuthController {

  async login(req: Request, res: Response, next: NextFunction) {

    try {

      const request = req.body as LoginUserRequest;
      const user = await UserService.getUserByEmail(request);
      user.token = TokenManager.generateToken(toPayloadToken(user));
      const newUser = await UserService.patchUserToken(user as UpdateUserRequest);
      newUser.role = user.role.name
      newUser.token = user.token
  
      res.status(200).send({
        data: newUser
      })

    } catch (e) {

      next(e);

    }

  }

  async logout(req: UserRequest, res: Response, next: NextFunction) {
    try {
      
      const reqUser = req.body as UpdateUserRequest;
      console.log(reqUser)
      await UserService.deleteUserToken(reqUser);

      res.status(200).send({
        message: 'Succeed delete token'
      })

    } catch (e) {
      
      next(e);

    }
  }

}
