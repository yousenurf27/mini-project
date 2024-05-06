'use client'

import React from 'react'
import CustomRadioRegister from '@/components/ui/CustomRadioRegister'
import { RadioGroup } from '@nextui-org/react'
import { useFormState } from 'react-dom'
import { useState } from 'react'
import EyeSlashFilledIcon from '@/components/ui/EyeSlashFilledIcon'
import EyeFilledIcon from '@/components/ui/EyeFilledIcon'
import CustomInput from '@/components/ui/CustomInput'
import ButtonAction from '@/components/ui/ButtonAction'
import { createUser } from '../actions/auth'

const Register = () => {
  const [ isVisible, setIsVisible ] = useState(false);
  const [ state, formAcion ] = useFormState(createUser, undefined);
  const [ isRole, setIsRole ] = useState('1');

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div
      className='container md:min-h-[calc(100vh-66px)] min-h-[calc(100vh-60px)] mx-auto px-4 py-10 flex justify-center items-center'
    >
      <div className='w-full md:w-12/12 lg:w-8/12 p-6 shadow-medium rounded-md'>
        <h2 className='mb-5 font-semibold text-3xl text-center'>Sing Up</h2>
        <form action={formAcion}>
          <p className='mb-2 text-small text-danger'>{state?.message}</p>
          <RadioGroup label="Roles" name='roleId' description="Selected one role you want." orientation="horizontal" isRequired
            value={isRole}
            classNames={{
              label: "text-foreground text-small"
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
                color={state?.errors?.firstName ? "danger" : "default"}
                placeholder="Enter your first name"
                isRequired
              />
              {state?.errors?.firstName && <p className='text-tiny text-danger'>{state.errors.firstName}</p>}
            </div>
            <div className='pt-4'>
              <CustomInput 
                type="text"
                label="Last Name"
                name="lastName"
                color={state?.errors?.lastName ? "danger" : "default"}
                placeholder="Enter your last name"
                isRequired
              />
              {state?.errors?.lastName && <p className='text-tiny text-danger'>{state.errors.lastName}</p>}
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
                  color={state?.errors?.password ? "danger" : "default"}
                  placeholder="Enter your password"
                  isRequired
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
              {state?.errors?.password && <p className='text-tiny text-danger'>{state.errors.password}</p>}
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
          
          <ButtonAction title='Sign Up' />
        </form>
      </div>
    </div>
  )
}

export default Register