'use server'

import { createHash, randomUUID } from 'node:crypto'
import { and, desc, eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { auditEvents, careConversations } from '@/lib/db/schema'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function listAuditEvents() {
  const userId = await getUserId()
  return db.select().from(auditEvents).where(eq(auditEvents.userId, userId)).orderBy(desc(auditEvents.createdAt)).limit(50)
}

export async function scheduleCareConversation(subjectName: string, scheduledFor: Date, notes?: string) {
  const userId = await getUserId()
  const id = randomUUID()
  const previous = await db.select({ eventHash: auditEvents.eventHash }).from(auditEvents).where(eq(auditEvents.userId, userId)).orderBy(desc(auditEvents.createdAt)).limit(1)
  const previousHash = previous[0]?.eventHash ?? null
  const eventHash = createHash('sha256').update(`${id}:${userId}:care_conversation:${scheduledFor.toISOString()}:${previousHash ?? ''}`).digest('hex')
  await db.insert(careConversations).values({ id, userId, subjectName, scheduledFor, notes })
  await db.insert(auditEvents).values({ id: randomUUID(), userId, action: 'Care conversation scheduled', actor: 'Welfare officer', result: 'Allowed', subjectId: id, previousHash, eventHash })
  revalidatePath('/')
  return { id }
}

export async function recordDeniedAccess(subjectId: string) {
  const userId = await getUserId()
  const id = randomUUID()
  const eventHash = createHash('sha256').update(`${id}:${userId}:denied:${subjectId}`).digest('hex')
  await db.insert(auditEvents).values({ id, userId, action: 'Individual disciplinary lookup', actor: 'Command role', result: 'Denied by firewall', subjectId, eventHash })
  revalidatePath('/')
  return { denied: true }
}
