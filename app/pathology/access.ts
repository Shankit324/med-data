"use server"

import { db } from '@/src/db/index'
import { labTable } from '@/src/db/schema';
import { eq } from 'drizzle-orm';

export const x_val = async (username: any) : Promise<Object> => {
    const x = await db.select().from(labTable).where(eq(labTable.username, username));
    if(x.length > 0) return x[0];
    else return {};
};