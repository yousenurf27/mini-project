'use server'

import { api } from '@/api'
import axios from 'axios'
import { redirect } from 'next/navigation'
import { createSession, deleteSession } from '../lib/session'
import { FormState, SignupFormSchema } from '../lib/definitions'

export const createUser = async (state: FormState, formData: FormData) => {
  const validatedFields = SignupFormSchema.safeParse({
    roleId: formData.get('roleId'),
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    password: formData.get('password'),
    refReferral: formData.get('roleId') == '1' ? formData.get('refReferral') : ''
  })

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
  
  try {
    await api.post('users/', validatedFields.data)
  } catch (e) {
    if(axios.isAxiosError(e)) {
      return {
        message: e.response?.data.message
      }
    }
  }

  redirect('/login')
}

export const loginUser = async (prevState: any, formData: FormData) => {
  try {
    const rawFormData = {
      email: formData.get('email'),
      password: formData.get('password'),
    }
    
    const { data: res } = await api.post('auth/', rawFormData);
    
    createSession(res.data.token)
  } catch (e) {
    if(axios.isAxiosError(e)) {
      return {
        errors: e.response?.data.message
      }
    }
  }

  if(formData.get('roleId') == '1') {
    redirect('/')
  } else {
    redirect('/admin')
  }
}

export const logoutUser = async (id: string) => {
  try {
    await api.delete('auth/', {data:{ id: id }})
    deleteSession()
  } catch (error) {
    console.log(error)
  }

  redirect('/')
}
