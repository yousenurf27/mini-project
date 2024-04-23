"use client"

import { useCycle } from 'framer-motion';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Header = () => {
  const [ width, setWidth ] = useState<number>(0);
  const [ isOpen, toggleOpen ] = useCycle(false, true);

  useEffect(() => {
    setWidth(window.innerWidth);
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
            <>
              <ul className='flex'>
                <motion.li
                 className='px-3'
                 whileHover={{ scale: 0.95 }}
                 whileTap={{ scale: 0.7 }}
                >
                  <a className='block py-1 text-lg hover:text-emerald-500' href="#">Events</a>
                </motion.li>
              </ul>
              <Link href='/login'>
                <motion.button
                  className='ml-2 bg-transparent transition-all hover:bg-emerald-500 text-emerald-700 font-semibold hover:text-white py-2 px-4 border border-emerald-500 hover:border-transparent rounded-full'
                  whileTap={{ scale: .7 }}
                >
                  Login
                </motion.button>
              </Link>
              <Link href='/register'>
                <motion.button
                  className='ml-2 transition-all bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-full'
                  whileTap={{ scale: .7 }}
                >
                  Register
                </motion.button>
              </Link>
            </>
          ) : (
            <motion.div
              initial={false}
              animate={isOpen ? 'open' : 'closed'}
            >
              <motion.button
                className='relative z-20'
                onClick={() => toggleOpen()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                  <motion.path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    variants={{
                      closed: { d: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" },
                      open: { d: "M6 18 18 6M6 6l12 12" }
                    }} 
                  />
                </svg>
              </motion.button>
              <motion.div
                className= 'w-full max-w-xs pt-16 fixed top-0 bottom-0 bg-white z-10 drop-shadow-md shadow-slate-800'
                variants={{
                  closed: { right: '-100%', },
                  open: { right: '0%',  }
                }}
                transition={{
                  type: "spring",
                  bounce: 0,
                }}
              >
                <div className='flex flex-col'>
                  <ul className='mb-5 flex flex-col'>
                    <motion.li
                      whileTap={{ scale: .7 }}
                    >
                      <Link className='w-full px-6 py-4 block text-lg font-medium text-center focus:text-emerald-500' href='/'>Events</Link>
                    </motion.li>
                  </ul>
                  <Link className='flex mb-4' href='/login'
                    onClick={() => toggleOpen()}
                  >
                    <motion.button
                      className='mx-10 flex-grow bg-transparent transition-all focus:bg-emerald-500 text-emerald-700 font-semibold focus:text-white py-2 px-4 border border-emerald-500 focus:border-transparent rounded-full'
                      whileTap={{ scale: .7 }}
                    >
                      Login
                    </motion.button>
                  </Link>
                  <Link className='flex' href='/register'
                    onClick={() => toggleOpen()}
                  >
                    <motion.button
                      className='mx-10 flex-grow transition-all bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-full'
                      whileTap={{ scale: .7 }}
                    >
                      Register
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          ) }
        </div>
      </div>
    </div>
  )
};

export default Header
