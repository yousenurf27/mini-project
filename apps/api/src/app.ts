import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
} from 'express';
import cors from 'cors';
import { PORT } from './config';
import UserRouter from './routers/user.router';
import ClientError from './exceptions/ClientError';
import AuthRouter from './routers/auth.router';

export default class App {
  public app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
  }

  private handleError(): void {
    // error
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof ClientError) {
          res.status(err.statusCode).send({
            status: 'fail',
            message: err.message
          });
        } else if ( err instanceof Error ) {
          res.status(400).send({
            status: 'fail',
            message: err.message
          });
        } else {
          res.status(500).send({
            status: 'fail',
            message: 'Internal server error!'
          });
        }
      },
    );
  }

  private routes(): void {
    const userRouter = new UserRouter();
    const authRouter = new AuthRouter();

    this.app.get('/api/', (req: Request, res: Response) => {
      res.send(`Hello, Purwadhika Student !`);
    });

    this.app.use('/api/users', userRouter.getRouter());
    this.app.use('/api/auth', authRouter.getRouter());
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }
}
