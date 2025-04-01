"use server"

import { db } from '@/src/db/index'
import { pharmacyTable, InsertPharmacy } from '@/src/db/schema';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';

export const x_val = async (newPharmacy: any) : Promise<Boolean> => {
    const x = await db.select().from(pharmacyTable).where(eq(pharmacyTable.username, newPharmacy.username));
    if(x.length > 0) return false;
    else return true;
};

export const handle = async (newPharmacy: any) => {
    const labs = await db.query.pharmacyTable.findMany();
    const newId = labs.length + 1;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPharmacy.password, salt);
    const l: InsertPharmacy = {
      id: newId,
      name: newPharmacy.name,
      username: newPharmacy.username,
      location: newPharmacy.location,
      emailId: newPharmacy.emailId,
      mobileNumber: newPharmacy.mobileNumber,
      password: hashedPassword,
    };
    await db.insert(pharmacyTable).values(l);
};