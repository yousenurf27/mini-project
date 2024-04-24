"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link';
import MenuDesk from './MenuDesk';
import MenuMob from './MenuMob';

const Header = () => {
  const [ width, setWidth ] = useState<number>(0);
  
  useEffect(() => {
    setWidth(window.innerWidth)
    window.addEventListener('resize', () => setWidth(window.innerWidth))
    
    return () => {
      window.addEventListener('resize', () => setWidth(window.innerWidth))
    }
  }, [])
  return (
    <div className='fixed top-0 left-0 right-0 bg-white'>
      <div className='container mx-auto py-3 px-4 flex justify-between items-center'>
        <div className='h-fit'>
          <Link className='cursor-pointer' href='/'>
            <h1 className='font-bold text-3xl'><span className='text-emerald-500'>X</span> Events</h1>
          </Link>
        </div>
        <div className='flex justify-between items-baseline'>
          {width > 767 ? (
            <MenuDesk />
          ) : (
            width != 0 ? <MenuMob /> : ''
          )}
        </div>
      </div>
    </div>
  )
};

export default Header
