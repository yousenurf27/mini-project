'use client'

import { getEventsThunk } from '@/lib/features/event/eventSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hook'
import { formatPrice, showFormattedDate, showFormattedDateTime } from '@/utils';
import { Card, CardBody, CardFooter, CardHeader, Divider, Input, Pagination, Spinner } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

const Events = () => {
  const { events, pagination, isLoading } = useAppSelector((state) => state.event);
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const page = searchParams.get('page');
  const router = useRouter();

  const handlerSubmit = (e: any) => {
    e.preventDefault()

    if(e.target.search.value){
      router.push(`/events?search=${e.target.search.value}`)
    } else {
      router.push('/events')
    }
  }

  const handlerPagination = (page: number) => {
    if(search !== null) {
      if(page !== 1) {
        router.push(`/events?page=${page}&search=${search}`)
      } else {
        router.push(`/events?search=${search}`)
      }
    } else if(page !== 1){
      router.push(`/events?page=${page}`)
    } else {
      router.push('/events')
    }
  }

  useEffect(() => {
    dispatch(getEventsThunk({ search, page }))
  },[searchParams])
  return (
    <div className='container md:min-h-[calc(100vh-66px)] min-h-[calc(100vh-60px)] mx-auto px-4 pt-6 pb-10 relative z-0'>
      <div className='flex md:justify-between md:flex-row flex-col'>
        <h2 className='md:mb-0 mb-2 text-2xl font-semibold'>Events</h2>
        <form className='flex' onSubmit={handlerSubmit}>
          <Input
            name='search'
            classNames={{
              inputWrapper: [
                'border-emerald-500',
                'data-[hover=true]:border-emerald-700'
              ]
            }}
            variant='bordered' type='text' placeholder='Search Events'
          />
          <button className='ml-2 bg-transparent transition-all hover:bg-emerald-700 text-emerald-700 font-semibold hover:text-white py-1 px-3 border border-emerald-500 hover:border-transparent rounded-xl'>
            Search
          </button>
        </form>
      </div>
      {isLoading ? (
        <div className='min-h-[calc(100vh-200px)] flex justify-center items-center'>
          <Spinner color="success"/>
        </div>
      ) : (
        <>
          {events.length > 0 ? (
            <>
              <div className='pt-5 grid lg:grid-cols-3 md:grid-cols-2 gap-2'>
                {events.map((ev) => (
                  <Link href={`/events/${ev.id}`} key={ev.id}>
                    <Card className="max-w-[400px] relative">
                      <CardHeader className="flex gap-3 z-0">
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
              <div className='pt-8 flex justify-center'>
                <Pagination
                  loop showControls
                  color="success"
                  total={pagination.totalPage}
                  initialPage={page !== null ? +page : 1}
                  onChange={handlerPagination}
                />
              </div>
            </>
          ) : (
            <div className='min-h-[calc(100vh-130px)] flex justify-center items-center'>
              <h3 className='text-3xl font-semibold'>No Events Found</h3>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Events
