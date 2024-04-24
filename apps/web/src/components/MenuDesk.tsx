import { motion } from 'framer-motion'
import Link from 'next/link'
import UserMenu from './ui/UserMenu'

const MenuDesk = ({ props }: { props: number }) => {
  return (
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
      {/* {props > 767 && <UserMenu />} */}
      <Link href='/login'>
        <motion.button
          className='ml-2 bg-transparent transition-all hover:bg-emerald-500 text-emerald-700 font-semibold hover:text-white py-2 px-4 border border-emerald-500 hover:border-transparent rounded-full'
          whileTap={{ scale: .7 }}
        >
          Log In
        </motion.button>
      </Link>
      <Link href='/signup'>
        <motion.button
          className='ml-2 transition-all bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-full'
          whileTap={{ scale: .7 }}
        >
          Sign Up
        </motion.button>
      </Link>
    </>
  )
}

export default MenuDesk