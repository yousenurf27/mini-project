'use server'

import { api } from '@/api'
import axios from 'axios'
import { redirect } from 'next/navigation'

export const createUser = async (prevState: any, formData: FormData) => {
  try {
    const rawFormData = {
      roleId: formData.get('roleId'),
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      password: formData.get('password'),
      refReferral: formData.get('refReferral')
    }
  
    await api.post('users/', rawFormData)
  } catch (e) {
    if(axios.isAxiosError(e)) {
      return {
        errors: e.response?.data.message
      }
    }
  }

  redirect('/login')
}
