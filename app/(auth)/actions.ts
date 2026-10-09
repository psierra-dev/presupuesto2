'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { createClient } from '@/app/utils/supabase/server'

export async function login(prevState: any ,formData: FormData) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string, 
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.log(error.message)
    return {
      message: error.message,
      errors: ""
    }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(prevState: any, formData: FormData) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const new_data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        full_name: formData.get('fullname') as string, 
      }
    }
  }

  const { error, data } = await supabase.auth.signUp(new_data)
  console.log(data, 'data')

  if (error) {
    return {
      message: error.message
    }
  }

  revalidatePath('/', 'layout')
  redirect('/login')
}