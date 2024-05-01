"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link';
import MenuDesk from './MenuDesk';
import MenuMob from './MenuMob';
import UserMenu from './ui/UserMenu';

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
    <div className='fixed top-0 left-0 right-0 bg-white shadow-small shadow-slate-800 z-10'>
      <div className='container mx-auto py-3 px-4 flex justify-between items-center'>
        {/* {width < 767 && <UserMenu />} */}
        <div className='h-fit'>
          <Link className='cursor-pointer' href='/'>
            <h1 className='font-bold text-3xl'><span className='text-emerald-500'>X</span> Events</h1>
          </Link>
        </div>
        <div className='flex justify-between items-center'>
          {width > 767 ? (
            <MenuDesk props={width} />
          ) : (
            width != 0 ? <MenuMob /> : ''
          )}
        </div>
      </div>
    </div>
  )
};

export default Header
