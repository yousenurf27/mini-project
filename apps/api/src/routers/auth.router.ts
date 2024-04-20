import AuthController from '@/controllers/auth.controller';
import { verifyToken } from '@/middlewares/auth.middleware';
import { validateLoginUserData } from '@/middlewares/validation/userValidation';
import { Router } from 'express';

export default class AuthRouter {
  private router: Router;
  private authController: AuthController;

  constructor() {
    this.router = Router();
    this.authController = new AuthController();
    this.initializationRoutes();
  }

  private initializationRoutes(): void {
    this.router.post(
      '/',
      validateLoginUserData,
      this.authController.login
    );
    this.router.delete(
      '/',
      verifyToken,
      this.authController.logout
    )
  }

  getRouter(): Router {
    return this.router;
  }
}