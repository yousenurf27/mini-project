'use client'

import { getEventByEventIdThunk } from '@/lib/features/event/eventSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hook'
import { formatPrice, showFormattedDate, showFormattedDateTime } from '@/utils';
import { Divider, Spinner } from '@nextui-org/react';
import Image from 'next/image';
import { useEffect } from 'react'

const Page = ({ params }: { params: { id: string } }) => {
  const { event, isLoading } = useAppSelector((state) => state.event);
  const dispatch = useAppDispatch();

  console.log(event)

  useEffect(() => {
    dispatch(getEventByEventIdThunk(params.id))
  }, [])
  return (
    <div className='container md:min-h-[calc(100vh-66px)] min-h-[calc(100vh-60px)] mx-auto px-4 pt-6 pb-10 relative z-0'>
      {isLoading ? (
        <div className='min-h-[calc(100vh-200px)] flex justify-center items-center'>
          <Spinner color="success"/>
        </div>
      ) : (
        <div className='grid md:grid-cols-2 gap-6'>
          <div className='w-full md:h-auto h-[320px] relative'>
            <Image
              alt={event.title}
              src={`http://localhost:8000/images/${event.image}`}
              style={{
                objectFit: 'cover',
                objectPosition: 'top'
              }}
              sizes='100vw'
              fill
              priority={true}
            />
          </div>
          <div>
            <h4 className='mb-2 text-2xl font-semibold'>{event.title}</h4>
            <p>{event.desc}</p>
            <Divider className='my-6' />
            <div className='grid md:grid-cols-2 gap-2'>
              <div>
                <p className='font-semibold'>Location</p>
                <p>{event.location}</p>
              </div>
              <div>
                <p className='font-semibold'>Max attendee</p>
                <p>{event.attendee}</p>
              </div>
              <div>
                <p className='font-semibold'>Start</p>
                <p>{showFormattedDateTime(event.start)}</p>
              </div>
              <div>
                <p className='font-semibold'>Last Register</p>
                <p>{showFormattedDate(event.lastRegister)}</p>
              </div>
              <div className='col-span-2'>
                <p className='font-semibold'>Price</p>
                <p>{formatPrice(event.price)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Page