'use client'

import React from 'react'
import CustomRadioRegister from '@/components/ui/CustomRadioRegister'
import { RadioGroup } from '@nextui-org/react'
import { useFormState } from 'react-dom'
import { createUser } from './action'
import { motion } from 'framer-motion'
import { useState } from 'react'
import EyeSlashFilledIcon from '@/components/ui/EyeSlashFilledIcon'
import EyeFilledIcon from '@/components/ui/EyeFilledIcon'
import CustomInput from '@/components/ui/CustomInput'
import ButtonAction from '@/components/ui/ButtonAction'

const initialState = {
  errors: ''
}

const Register = () => {
  const [ isVisible, setIsVisible ] = useState(false);
  const [ state, formAcion ] = useFormState(createUser, initialState);
  const [ isRole, setIsRole ] = useState('1');
  const [ isOpen, setIsOpen ] = useState(true);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div
      className='container md:min-h-[calc(100vh-66px)] min-h-[calc(100vh-60px)] mx-auto px-4 py-10 flex justify-center items-center relative'
    >
      {state?.errors && isOpen && (
        <motion.div
          initial={{
            opacity: 0
          }}
          animate={isOpen ? { opacity: 1 } : { opacity: 0 }}
          className="absolute top-2 flex bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md" role="alert"
        >
          <span className="block sm:inline">{state.errors}</span>
          <span className="ml-2" onClick={() => setIsOpen(!isOpen)}>
            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
          </span>
        </motion.div>
      )}
      <div className='w-full md:w-12/12 lg:w-8/12 p-6 shadow-medium rounded-md'>
        <h2 className='mb-5 font-semibold text-3xl text-center'>Sing Up</h2>
        <form action={formAcion}>
          <RadioGroup label="Roles" name='roleId' description="Selected one role you want." orientation="horizontal" isRequired
            value={isRole}
            classNames={{
              label: "text-foreground"
            }}
            onValueChange={setIsRole}
          >
            <CustomRadioRegister value="1">
              User
            </CustomRadioRegister>
            <CustomRadioRegister value="2">
              Admin
            </CustomRadioRegister>
          </RadioGroup>
          <div className='grid md:grid-cols-2 md:gap-5'>
            <div className='pt-4'>
              <CustomInput 
                type="text"
                label="First Name"
                name="firstName"
                placeholder="Enter your first name"
                isRequired
              />
            </div>
            <div className='pt-4'>
              <CustomInput 
                type="text"
                label="Last Name"
                name="lastName"
                placeholder="Enter your last name"
                isRequired
              />
            </div>
          </div>
          <div className='grid md:grid-cols-2 md:gap-5'>
            <div className='pt-4'>
              <CustomInput
                  type="email"
                  label="Email"
                  name="email"
                  placeholder="Enter your email"
                  isRequired
              />
            </div>
            <div className='pt-4'>
              <CustomInput
                  type={isVisible ? "text" : "password"}
                  label="Password"
                  name="password"
                  placeholder="Enter your password"
                  isRequired
                  minLength={8}
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
              />
            </div>
          </div>
          { isRole == '1' && (
            <div className='pt-4'>
              <CustomInput
                  type="text"
                  label="Referral"
                  name="refReferral"
                  placeholder="Enter referral"
                  description="Use referrals from other users to get a 10% discount voucher"
              />
            </div>
          )}
          
          <ButtonAction />
        </form>
      </div>
    </div>
  )
}

export default Register