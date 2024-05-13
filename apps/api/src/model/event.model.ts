import { Event } from '@prisma/client';

export type CreateEventRquest = {
  id: string,
  title: string;
  desc: string;
  start: string;
  lastRegister: string;
  price: number;
  image: string;
  attendee: number;
  location: string;
  type: string;
  userId: string;
}

export type GetEventsByUserIdRquest = {
  userId: string;
  page: string | undefined;
}

export type GetEventRquest = {
  page: string | undefined;
  search: string | undefined;
}

export type GetEventByEventIdRquest = {
  id: string;
}

export type DeleteEventByUserIdRquest = {
  id: string;
  userId: string;
}

export const toEventResponse = (event: Event) => {
  return {
    id: event.id,
    title: event.title,
    desc: event.desc,
    start: event.start,
    lastRegister: event.lastRegister,
    attendee: event.attendee,
    image: event.image,
    price: event.price,
    location: event.location,
    type: event.type
  }
}

export const toEventsResponse = (events: Event[]) => {
  const event = events.map((ev) => ({
    id: ev.id,
    title: ev.title,
    desc: ev.desc,
    start: ev.start,
    lastRegister: ev.lastRegister,
    attendee: ev.attendee,
    image: ev.image,
    price: ev.price,
    location: ev.location,
    type: ev.type
  }))
  
  return event
}
