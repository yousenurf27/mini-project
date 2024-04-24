import { Variants, motion, useCycle } from 'framer-motion'
import Link from 'next/link';

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

const MenuMob = () => {
  const [ isOpen, toggleOpen ] = useCycle(false, true);
  return (
    <motion.div
      className='flex items-baseline'
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
    >
      <motion.button
        className='relative z-20'
        onClick={() => toggleOpen()}
      >
        <svg width="23" height="23" viewBox="0 0 23 23">
          <Path
            variants={{
              closed: { d: "M 2 2.5 L 20 2.5" },
              open: { d: "M 3 16.5 L 17 2.5" }
            }}
          />
          <Path
            d="M 2 9.423 L 20 9.423"
            variants={{
              closed: { opacity: 1 },
              open: { opacity: 0 }
            }}
            transition={{ duration: 0.1 }}
          />
          <Path
            variants={{
              closed: { d: "M 2 16.346 L 20 16.346" },
              open: { d: "M 3 2.5 L 17 16.346" }
            }}
          />
        </svg>
      </motion.button>
      <motion.div
        className= 'w-full max-w-xs pt-16 fixed top-0 bottom-0 bg-white z-10 shadow-medium shadow-slate-800'
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
              Log In
            </motion.button>
          </Link>
          <Link className='flex' href='/signup'
            onClick={() => toggleOpen()}
          >
            <motion.button
              className='mx-10 flex-grow transition-all bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-full'
              whileTap={{ scale: .7 }}
            >
              Sign Up
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default MenuMob