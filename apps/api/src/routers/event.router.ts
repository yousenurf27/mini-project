import EventController from '@/controllers/event.controller';
import { verifyToken } from '@/middlewares/auth.middleware';
import { uploader } from '@/middlewares/uploader';
import { validateCreateEventData } from '@/middlewares/validation/eventValidation';
import { Router } from 'express';

export default class EventRouter {
  private router: Router;
  private eventController: EventController;

  constructor() {
    this.router = Router();
    this.eventController = new EventController();
    this.initializationRoutes();
  }

  private initializationRoutes(): void {
    this.router.post(
      '/',
      uploader('IMG', '/images').single('file'),
      verifyToken,
      validateCreateEventData,
      this.eventController.postEvent
    );
    this.router.get(
      '/byId',
      verifyToken,
      this.eventController.getEventsByUserId
    );
    this.router.delete(
      '/:eventId',
      verifyToken,
      this.eventController.deleteEventsByUserId
    );
    this.router.get(
      '/recent',
      this.eventController.getRecentEvents
    );
    this.router.get(
      '/',
      this.eventController.getEvents
    );
    this.router.get(
      '/:eventId',
      this.eventController.getEventByEventId
    );
  }

  getRouter(): Router {
    return this.router;
  }
}