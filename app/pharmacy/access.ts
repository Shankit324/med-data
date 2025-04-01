"use server"

import { db } from '@/src/db/index'
import { pharmacyTable } from '@/src/db/schema';
import { eq } from 'drizzle-orm';

export const x_val = async (username: string) : Promise<Object> => {
    const x = await db.select().from(pharmacyTable).where(eq(pharmacyTable.username, username));
    if(x.length > 0) return x[0];
    else return {};
}; 