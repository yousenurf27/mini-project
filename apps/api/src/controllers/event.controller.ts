import InvariantError from '@/exceptions/InvariantError';
import { CreateEventRquest, GetEventRquest, GetEventsByUserIdRquest } from '@/model/event.model';
import { EventService } from '@/services/event.service';
import { UserRequest } from '@/type/userRequest';
import { NextFunction, Request, Response } from 'express';

export default class EventController {

  async postEvent(req: UserRequest, res: Response, next: NextFunction) {

    const { file } = req

    if(file == undefined) {
      throw new InvariantError('File is required')
    }

    const request = req.body as CreateEventRquest
    request.image = file.filename
    request.userId = req.user?.id!

    const event = await EventService.addEvent(request)

    try {
      res.status(201).send({
        status: 'success',
        data: event
      });
    } catch (e) {
      next(e)
    }

  }

  async getEventsByUserId(req: UserRequest, res: Response, next: NextFunction) {

    try {
      const id = req.user?.id!
      const { page } = req.query as GetEventsByUserIdRquest;

      const { events, pagination } = await EventService.getEventsByUserId({ userId: id, page });

      res.status(200).send({
        data: events,
        pagination
      });
    } catch (e) {
      next(e);
    }

  }

  async getEventByEventId(req: Request, res: Response, next: NextFunction) {

    try {
      const { eventId } = req.params;

      const event = await EventService.getEventByEventId({ id: eventId });

      res.status(200).send({
        data: event
      })
    } catch (e) {
      next(e);
    }

  }

  async getEvents(req: Request, res: Response, next: NextFunction) {

    try {
      const { search, page } = req.query as GetEventRquest;

      const { events, pagination } = await EventService.getEvents({ search, page });

      res.status(200).send({
        data: events,
        pagination
      })
    } catch (e) {
      next(e);
    }

  }

  async getRecentEvents(req: Request, res: Response, next: NextFunction) {

    try {
      const events = await EventService.getRecentEvents();

      res.status(200).send({
        data: events
      })
    } catch (e) {
      next(e);
    }

  }

  async deleteEventsByUserId(req: UserRequest, res: Response, next: NextFunction) {

    try {
      const { eventId } = req.params;
      const userId = req.user?.id!;

      await EventService.deleteEventByUserId({ id: eventId,userId: userId });

      res.status(200).send({
        status: 'success'
      });
    } catch (e) {
      next(e);
    }

  }

}