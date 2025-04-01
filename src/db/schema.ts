import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const patientTable = sqliteTable('patient', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  age: integer('age').notNull(),
  dob: text('dob').unique().notNull(),
  emailId: text('email_id').notNull(),
  mobileNumber: text('mobile_number').notNull(),
  username: text('username').notNull(),
  med_rep: text('med_rep').notNull(),
});

export const hospitalTable = sqliteTable('hospital', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  username: text('username').notNull(),
  location: text('location').notNull(),
  emailId: text('email_id').notNull(),
  mobileNumber: text('mobile_number').notNull(),
  password: text('password').notNull(),
});

export const pharmacyTable = sqliteTable('pharmacy', {
    id: integer('id').primaryKey(),
    name: text('name').notNull(),
    username: text('username').notNull(),
    location: text('location').notNull(),
    emailId: text('email_id').notNull(),
    mobileNumber: text('mobile_number').notNull(),
    password: text('password').notNull(),
});

export const labTable = sqliteTable('lab', {
    id: integer('id').primaryKey(),
    name: text('name').notNull(),
    username: text('username').notNull(),
    location: text('location').notNull(),
    emailId: text('email_id').notNull(),
    mobileNumber: text('mobile_number').notNull(),
    password: text('password').notNull(),
});

export type InsertPatient = typeof patientTable.$inferInsert;
export type SelectPatient = typeof patientTable.$inferSelect;

export type InsertHospital = typeof hospitalTable.$inferInsert;
export type SelectHospital = typeof hospitalTable.$inferSelect;

export type InsertPharmacy = typeof pharmacyTable.$inferInsert;
export type SelectPharmacy = typeof pharmacyTable.$inferSelect;

export type InsertLab = typeof labTable.$inferInsert;
export type SelectLab = typeof labTable.$inferSelect;
