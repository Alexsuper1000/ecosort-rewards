'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function submitDemoRequest(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const company = formData.get('company') as string
  const message = formData.get('message') as string

  if (!name || !email) {
    throw new Error('Name and email are required.')
  }

  await prisma.lead.create({
    data: {
      name,
      email,
      company,
      message,
    }
  })

  revalidatePath('/admin/leads')
}
