import { useFormStatus } from 'react-dom'
import { motion } from 'framer-motion'
import { Spinner } from '@nextui-org/react'

const ButtonAction = ({ title } : { title: string}) => {
  const { pending } = useFormStatus()

  return (
    <div className='flex justify-center pt-6'>
      <motion.button
        type='submit'
        className={`mx-auto w-10/12 transition-all ${pending ? 'bg-emerald-200' : 'bg-emerald-500 hover:bg-emerald-700'} text-white font-bold py-2 px-4 rounded-xl`}
        whileTap={{ scale: .7 }}
        disabled={pending}
      >
        {pending ? <Spinner color="success"/> : title}
      </motion.button>
    </div>
  )
}

export default ButtonAction