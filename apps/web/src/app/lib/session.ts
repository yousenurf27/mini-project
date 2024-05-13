'use server'

import { cookies } from 'next/headers'
import { errors, jwtVerify } from 'jose'
 
const secretKey = process.env.NEXT_PRIVATE_TOKEN_KEY
const encodedKey = new TextEncoder().encode(secretKey)

export async function createSession(token: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
 
  cookies().set('session', token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}

export async function getToken() {
  return cookies().get('session')?.value;
}

export async function deleteSession() {
  cookies().delete('session')
}

export async function decrypt(token: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(token, encodedKey)
    return payload
  } catch (err) {
    if (err instanceof errors.JOSEError) {
      console.log(err.name)
    } else {
      console.log(err)
    }
  }
}
