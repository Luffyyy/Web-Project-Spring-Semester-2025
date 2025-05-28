'use server';
import { cookies } from "next/headers";
import getMongoCollection from "./getMongoCollection";
import { ObjectId } from "mongodb";

export async function getUser(){
    const users = await getMongoCollection('users');
    const cookieStore = await cookies();
    
    // Get the user ID from the cookies
    const userId = cookieStore.get('user')?.value;
    if (!userId) {
        return null;
    }
    // Fetch the user's favorites
    return await users.findOne(
        { _id: new ObjectId(userId) },
        { projection: { favorites: 1 } }
    );
}