import UserController from '@/controllers/user.controller';
import { validateUserData } from '@/middlewares/validation/createUserValidation';
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
      '/register',
      validateUserData,
      this.userController.postUser
    );
  }

  getRouter(): Router {
    return this.router;
  }
}