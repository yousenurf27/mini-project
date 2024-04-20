import UserController from '@/controllers/user.controller';
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
  }

  getRouter(): Router {
    return this.router;
  }
}