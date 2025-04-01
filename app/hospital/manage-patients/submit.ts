"use server"

import { db } from '@/src/db/index'
import { patientTable, InsertPatient } from '@/src/db/schema';
import { eq } from 'drizzle-orm';

export const x_val = async (newPatient: any) : Promise<Boolean> => {
    let user = newPatient.name+newPatient.age+newPatient.dob+newPatient.emailId+newPatient.mobileNumber;
    const x = await db.select().from(patientTable).where(eq(patientTable.username, user));
    if(x.length > 0) return false;
    else return true;
};

export const handle = async (newPatient: any) => {
    const labs = await db.query.patientTable.findMany();
    console.log(labs);
    const newId = labs.length + 1;
    let user = newPatient.name+newPatient.age+newPatient.dob+newPatient.emailId+newPatient.mobileNumber
    const l: InsertPatient = {
      id: newId,
      name: newPatient.name,
      age: parseInt(newPatient.age),
      dob: newPatient.dob,
      emailId: newPatient.emailId,
      mobileNumber: newPatient.mobileNumber,
      username: user,
      med_rep: "[]",
    };
    await db.insert(patientTable).values(l);
};