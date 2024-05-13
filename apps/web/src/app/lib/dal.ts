'use server'
 
import { cookies } from 'next/headers'
import { decrypt } from '@/app/lib/session'
 
export const verifySession = async () => {
  const cookie = cookies().get('session')?.value
  const session = await decrypt(cookie)
  let isAuth = false
 
  if(session != undefined) {
    isAuth = true
  }

  return { isAuth: isAuth, session: session, token: cookie }
}