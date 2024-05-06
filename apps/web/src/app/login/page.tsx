'use client'

import ButtonAction from '@/components/ui/ButtonAction'
import CustomInput from '@/components/ui/CustomInput'
import CustomRadioRegister from '@/components/ui/CustomRadioRegister'
import EyeFilledIcon from '@/components/ui/EyeFilledIcon'
import EyeSlashFilledIcon from '@/components/ui/EyeSlashFilledIcon'
import { RadioGroup } from '@nextui-org/react'
import { useState } from 'react'
import { useFormState } from 'react-dom'
import { loginUser } from '../actions/auth'

const Login = () => {
  const [ isVisible, setIsVisible ] = useState(false);
  const [ state, formAcion ] = useFormState(loginUser, undefined);
  const [ isRole, setIsRole ] = useState('1');

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div
      className='container md:min-h-[calc(100vh-66px)] min-h-[calc(100vh-60px)] mx-auto px-4 py-10 flex justify-center items-center'
    >
      <div className='w-full md:w-8/12 lg:w-4/12 p-6 shadow-medium rounded-md'>
        <h2 className='mb-5 font-semibold text-3xl text-center'>Log In</h2>
        <form action={formAcion}>
          <p className='mb-2 text-small text-danger'>{state?.errors}</p>
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
          
          <ButtonAction title='Sign In' />
        </form>
      </div>
    </div>
  )
}

export default Login
