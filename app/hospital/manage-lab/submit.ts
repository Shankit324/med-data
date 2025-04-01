"use server"

import { db } from '@/src/db/index'
import { labTable, InsertLab } from '@/src/db/schema';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';

export const x_val = async (newLab: any) : Promise<Boolean> => {
    const x = await db.select().from(labTable).where(eq(labTable.username, newLab.username));
    if(x.length > 0) return false;
    else return true;
};

export const handle = async (newLab: any) => {
    const labs = await db.query.labTable.findMany();
    const newId = labs.length + 1;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newLab.password, salt);
    const l: InsertLab = {
      id: newId,
      name: newLab.name,
      username: newLab.username,
      location: newLab.location,
      emailId: newLab.emailId,
      mobileNumber: newLab.mobileNumber,
      password: hashedPassword,
    };
    await db.insert(labTable).values(l);
};