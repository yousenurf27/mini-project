import fs from 'fs';
import path from 'path';
import { CreateEventRquest, DeleteEventByUserIdRquest, GetEventByEventIdRquest, GetEventRquest, GetEventsByUserIdRquest, toEventResponse, toEventsResponse } from '@/model/event.model';
import prisma from '@/prisma';
import { v4 as uuid } from 'uuid';

export class EventService {

  static async addEvent(req: CreateEventRquest) {

    req.id = `event-${uuid()}`
    req.price = +req.price
    req.attendee = +req.attendee

    const event = await prisma.event.create({
      data: req
    })

    return toEventResponse(event)

  }

  static async getEventsByUserId(req: GetEventsByUserIdRquest) {

    let skip = 0;
    const take = 3;

    if(req.page) skip = (+req.page - 1) * take;

    const events = await prisma.event.findMany({
      skip: skip,
      take: take,
      where: {
        userId: req.userId
      },
      orderBy: { start: 'asc' }
    })

    const totalEvents = await prisma.event.count({
      where: {
        userId: req.userId
      },
      orderBy: { start: 'asc' }
    })

    const totalPage = Math.ceil(totalEvents/take);
    const currentPage = req.page ? +req.page : 1;

    return {
      events: toEventsResponse(events),
      pagination: {
        totalPage,
        currentPage
      }
    }

  }

  static async getEvents(req: GetEventRquest) {

    let search = '';
    let skip = 0;
    const take = 3;

    if(req.search) search = req.search;
    if(req.page) skip = (+req.page - 1) * take;

    const events = await prisma.event.findMany({
      skip: skip,
      take: take,
      where: {
        title: {
          contains: search
        }
      },
      orderBy: { start: 'asc' }
    })

    const totalEvents = await prisma.event.count({
      where: {
        title: {
          contains: search
        }
      },
      orderBy: { start: 'asc' }
    })

    const totalPage = Math.ceil(totalEvents/take);
    const currentPage = req.page ? +req.page : 1;

    return {
      events: toEventsResponse(events),
      pagination: {
        totalPage,
        currentPage
      }
    }

  }

  static async getEventByEventId(req: GetEventByEventIdRquest) {

    const event = await prisma.event.findUnique({
      where: {
        id: req.id
      }
    })

    return toEventResponse(event!)

  }

  static async getRecentEvents() {

    const events = await prisma.event.findMany({
      take: 3,
      orderBy: { start: 'asc' }
    })

    return toEventsResponse(events)

  }

  static async deleteEventByUserId(req: DeleteEventByUserIdRquest) {

    const event = await prisma.event.delete({
      where: {
        id: req.id,
        userId: req.userId
      },
    })

    fs.unlinkSync(path.join(__dirname, `../../public/images/${event.image}`))

  }

}
