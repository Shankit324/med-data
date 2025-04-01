"use server"

import { db } from '@/src/db/index'
import { hospitalTable, InsertHospital } from '@/src/db/schema';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';

export const x_val = async (newHospital: any) : Promise<Boolean> => {
  const x = await db.select().from(hospitalTable).where(eq(hospitalTable.username, newHospital.username));
  if(x.length > 0) return false;
  else return true;
};

export const handle = async (newHospital: any) => {
    const labs = await db.query.hospitalTable.findMany();
    const newId = labs.length + 1;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newHospital.password, salt);
    const l: InsertHospital = {
      id: newId,
      name: newHospital.name,
      username: newHospital.username,
      location: newHospital.location,
      emailId: newHospital.emailId,
      mobileNumber: newHospital.mobileNumber,
      password: hashedPassword,
    };
    await db.insert(hospitalTable).values(l);
};