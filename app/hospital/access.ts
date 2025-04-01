"use server"

import { db } from '@/src/db/index'
import { hospitalTable, pharmacyTable, labTable, patientTable } from '@/src/db/schema';
import { eq } from 'drizzle-orm';
import { and } from "drizzle-orm";

export const x_val = async (username: any) : Promise<Object> => {
    const x = await db.select().from(hospitalTable).where(eq(hospitalTable.username, username));
    if(x.length > 0) return x[0];
    else return {};
};

export const check = async (a: any, b: any, c: any, d1:any, d2: any) : Promise<Boolean> => {
    const x = await db.select().from(hospitalTable).where(eq(hospitalTable.username, a));
    const y = await db.select().from(pharmacyTable).where(eq(pharmacyTable.username, b));
    const z = await db.select().from(labTable).where(eq(labTable.username, c));
    const w = await db.select().from(patientTable).where(and(eq(patientTable.name, d1), eq(patientTable.dob, d2)));
    console.log(d1, d2);
    console.log(x, y, z, w);
    if(x.length > 0 && y.length > 0 && z.length > 0 && w.length > 0) return true;
    else return false;
}