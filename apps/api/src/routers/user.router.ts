import UserController from '@/controllers/user.controller';
import { verifyToken } from '@/middlewares/auth.middleware';
import { validateCreateUserData } from '@/middlewares/validation/userValidation';
import { Router } from 'express';

export default class UserRouter {
  private router: Router;
  private userController: UserController;

  constructor() {
    this.router = Router();
    this.userController = new UserController();
    this.initializationRoutes();
  }

  private initializationRoutes(): void {
    this.router.post(
      '/',
      validateCreateUserData,
      this.userController.postUser
    );
    this.router.get(
      '/voucher',
      verifyToken,
      this.userController.getVouchersByUserId
    )
  }

  getRouter(): Router {
    return this.router;
  }
}