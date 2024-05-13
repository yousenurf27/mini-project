"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { JWTPayload } from 'jose';
import { useAppDispatch } from '@/lib/hook';
import { addAuth } from '@/lib/features/auth/authSlice';
import AdminMenu from './ui/AdminMenu';

const HeaderAdmin = ({ auth }: { auth: { isAuth: boolean, session: JWTPayload | undefined, token: string | undefined} }) => {
  const [ width, setWidth ] = useState<number>(0);

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(addAuth(auth))
    setWidth(window.innerWidth)
    window.addEventListener('resize', () => setWidth(window.innerWidth))
    
    return () => {
      window.addEventListener('resize', () => setWidth(window.innerWidth))
    }
  }, [auth, dispatch])
  return (
    <div className='fixed top-0 left-0 right-0 bg-white shadow-small shadow-slate-800 z-10'>
      <div className='container mx-auto py-3 px-4 flex justify-between items-center'>
        <div className='h-fit'>
          <Link className='cursor-pointer' href='/'>
            <h1 className='font-bold text-3xl'><span className='text-emerald-500'>X</span> Events</h1>
          </Link>
        </div>
        <div className='flex justify-between items-center'>
          <AdminMenu />
        </div>
      </div>
    </div>
  )
};

export default HeaderAdmin
