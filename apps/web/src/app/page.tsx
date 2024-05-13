'use client'

import { getRecentEventsThunk } from '@/lib/features/event/eventSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import { formatPrice, showFormattedDate, showFormattedDateTime } from '@/utils';
import { Card, CardBody, CardFooter, CardHeader, Divider, Spinner } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Home() {
  const { events, isLoading } = useAppSelector((state) => state.event);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getRecentEventsThunk());
  },[])
  return (
    <>
      <div className='w-full md:min-h-[300px] min-h-[320px] relative z-0'>
        <Image
          alt='Banner X Event'
          src='https://cdn.evbstatic.com/s3-build/fe/build/images/9662fa598ddd4e8f78fd87196067cfd3-homepage_banner_nightlife_1067x470.webp'
          style={{
            objectFit: 'cover',
            objectPosition: 'top'
          }}
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          fill
          priority={true}
        />
      </div>
      <div className='container mx-auto px-4 py-10 items-start relative z-0'>
        <h3 className='font-semibold text-lg'>Recent Events</h3>
        {isLoading ? (
          <div className='min-h-[300px] flex justify-center items-center'>
            <Spinner color="success"/>
          </div>
        ) : (
          <div className='pt-5 grid lg:grid-cols-3 md:grid-cols-2 gap-2'>
            {events.map((ev) => (
              <Link href={`/events/${ev.id}`} key={ev.id}>
                <Card className="max-w-[400px]">
                  <CardHeader className="flex gap-3">
                    <div className='w-full md:h-44 h-40 relative'>
                      <Image
                        alt={ev.title}
                        src={`http://localhost:8000/images/${ev.image}`}
                        style={{
                          objectFit: 'cover',
                          borderRadius: '1rem'
                        }}
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                        fill
                        priority={true}
                      />
                    </div>
                  </CardHeader>
                  <Divider/>
                  <CardBody>
                    <h4 className='mb-2 text-lg font-semibold'>{ev.title}</h4>
                    <p>{ev.desc}</p>
                  </CardBody>
                  <Divider/>
                  <CardFooter className='text-sm'>
                    <div className='grid md:grid-cols-2 gap-2'>
                      <div>
                        <p className='font-semibold'>Location</p>
                        <p>{ev.location}</p>
                      </div>
                      <div>
                        <p className='font-semibold'>Max attendee</p>
                        <p>{ev.attendee}</p>
                      </div>
                      <div>
                        <p className='font-semibold'>Start</p>
                        <p>{showFormattedDateTime(ev.start)}</p>
                      </div>
                      <div>
                        <p className='font-semibold'>Last Register</p>
                        <p>{showFormattedDate(ev.lastRegister)}</p>
                      </div>
                      <div className='col-span-2'>
                        <p className='font-semibold'>Price</p>
                        <p>{formatPrice(ev.price)}</p>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
