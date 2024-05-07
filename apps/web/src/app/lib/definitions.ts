import { z } from 'zod'
 
export const SignupFormSchema = z.object({
  roleId: z
    .string(),
  firstName: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .regex(/^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/, { message: 'Can not contain number.' })
    .trim(),
  lastName: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .regex(/^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/, { message: 'Can not contain number.' })
    .trim(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .trim(),
})
 
export type FormState =
  | {
      errors?: {
        roleId?: string[]
        firstName?: string[]
        lastName?: string[]
        email?: string[]
        password?: string[]
        refReferral?: string[]
      }
      message?: string
    }
  | undefined
