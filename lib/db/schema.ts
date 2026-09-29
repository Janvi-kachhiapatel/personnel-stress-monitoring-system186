import { boolean, integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().defaultNow(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(), expiresAt: timestamp('expiresAt', { withTimezone: true }).notNull(), token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(), updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().defaultNow(), ipAddress: text('ipAddress'), userAgent: text('userAgent'), userId: text('userId').notNull(),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(), accountId: text('accountId').notNull(), providerId: text('providerId').notNull(), userId: text('userId').notNull(), accessToken: text('accessToken'), refreshToken: text('refreshToken'), idToken: text('idToken'), accessTokenExpiresAt: timestamp('accessTokenExpiresAt', { withTimezone: true }), refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt', { withTimezone: true }), scope: text('scope'), password: text('password'), createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(), updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().defaultNow(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(), identifier: text('identifier').notNull(), value: text('value').notNull(), expiresAt: timestamp('expiresAt', { withTimezone: true }).notNull(), createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(), updatedAt: timestamp('updatedAt', { withTimezone: true }).notNull().defaultNow(),
})

export const auditEvents = pgTable('audit_events', {
  id: text('id').primaryKey(), userId: text('user_id').notNull(), action: text('action').notNull(), actor: text('actor').notNull(), result: text('result').notNull(), subjectId: text('subject_id'), previousHash: text('previous_hash'), eventHash: text('event_hash').notNull(), createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export const careConversations = pgTable('care_conversations', {
  id: text('id').primaryKey(), userId: text('user_id').notNull(), subjectName: text('subject_name').notNull(), scheduledFor: timestamp('scheduled_for', { withTimezone: true }).notNull(), status: text('status').notNull().default('scheduled'), notes: text('notes'), createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export const riskSignals = pgTable('risk_signals', {
  id: text('id').primaryKey(), userId: text('user_id').notNull(), personId: text('person_id').notNull(), score: integer('score').notNull(), risk: text('risk').notNull(), signal: text('signal').notNull(), consentStatus: text('consent_status').notNull(), createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export type AuditEvent = typeof auditEvents.$inferSelect
export type CareConversation = typeof careConversations.$inferSelect
export type RiskSignal = typeof riskSignals.$inferSelect

export const schema = { user, session, account, verification, auditEvents, careConversations, riskSignals }
export default schema
