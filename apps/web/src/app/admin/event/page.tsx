'use client'

import { Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Pagination,
  Spinner,
  useDisclosure
} from '@nextui-org/react'
import ModalAddEvent from '@/components/ui/ModalAddEvent';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import { useEffect } from 'react';
import { deleteEventByIdThunk, getEventsByIdThunk } from '@/lib/features/mystore/myStoreSlice';
import { formatPrice, showFormattedDate, showFormattedDateTime } from '@/utils';
import { DeleteIcon } from '@/components/ui/DeleteIcon';
import { useRouter, useSearchParams } from 'next/navigation';

const Event = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { events, pagination, isLoading } = useAppSelector((state) => state.myStore);
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handlerPagination = (page: number) => {
    if(page !== 1){
      router.push(`/admin/event?page=${page}`)
    } else {
      router.push('/admin/event')
    }
  }

  useEffect(() => {
    dispatch(getEventsByIdThunk({ page }))
  }, [searchParams])

  return (
    <div className='container md:min-h-[calc(100vh-66px)] min-h-[calc(100vh-60px)] mx-auto px-4 py-10 relative z-0'>
      <h2 className='mb-4 text-3xl font-semibold'>My Events</h2>
      <div className='flex justify-end'>
        <Button className='bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-xl' onPress={onOpen}>Add Event</Button>
      </div>
      <ModalAddEvent isOpen={isOpen} onOpenChange={onOpenChange} />

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
                  <Card className="max-w-[400px] relative" key={ev.id}>
                    <Button
                      className='absolute top-2 right-2 p-2 h-fit min-w-fit rounded-full z-10'
                      color="danger" variant="bordered"
                      onClick={() => {
                        dispatch(deleteEventByIdThunk(ev.id))
                        router.push('/admin/event')
                      }}
                    >
                      <DeleteIcon />
                    </Button>
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
            <div className='min-h-[calc(100vh-200px)] flex justify-center items-center'>
              <h3 className='text-3xl font-semibold'>Haven&#39;t created an event yet</h3>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Event
