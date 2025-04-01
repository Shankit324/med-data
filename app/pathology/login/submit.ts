"use server"

import { db } from '@/src/db/index'
import { labTable } from '@/src/db/schema';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';

async function comparePasswords(plainTextPassword: any, hashedPassword: any) {
    const isMatch = await bcrypt.compare(plainTextPassword, hashedPassword);
    return isMatch;
}

export const x_val = async (username: any) : Promise<Boolean> => {
    const x = await db.select().from(labTable).where(eq(labTable.username, username));
    if(x.length == 0) return false;
    else return true;
};

export const y_val = async (username: any, password: any) : Promise<Boolean> => {
    const x = await db.select().from(labTable).where(eq(labTable.username, username));
    const isMatch = await comparePasswords(password, x[0].password);
    if (isMatch) return true;
    else return false;
};

export const z_val = async (username: any, password: any) : Promise<Boolean> => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    try {
        await db.update(labTable).set({ password: hashedPassword }).where(eq(labTable.username, username));
        return true;
    } catch (err) {
        console.error('Error updating user email:', err);
        return false;
    }
};
