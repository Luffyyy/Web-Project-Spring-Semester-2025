import { cookies } from "next/headers";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

/**
 * This simple function saves you from needing to write these two verbose lines
 * I used typescript here so the type gets saved, this should help our developer experience
 * 
 * @param name The name of the collection you wish to fetch
 */
export async function getMongoCollection(name) {
    const client = await clientPromise;
    return client.db("nextfit").collection(name);
}

export async function getUser(){
    const users = await getMongoCollection('users');
    const cookieStore = await cookies();
    
    // Get the user ID from the cookies
    const userId = cookieStore.get('user')?.value;
    if (!userId) {
        return null;
    }
    // Fetch the user's favorites
    const user = await users.findOne(
        { _id: new ObjectId(userId) }
    );

    user._id = user._id.toString();

    return user;
}

/**
 * This fixes mongodb arrays that contain the problematic _id
 * _id is a BSON object, next doesn't like it when you pass it from server to client
 * All this does is go through each object in the array and convert the _ids into a string
 */
export function normalizeMongoIds(arr) {
    if (Array.isArray(arr)) {
        return arr.map(obj => ({
            ...obj,
            _id: obj._id.toString(),
        }));
    } else {
        return {
            ...arr,
            _id: arr._id.toString(),
        };
    }
}

/**
 * Escapes dangerous characters when doing mongodb search
 * 
 * @param {string} text The text to escape
 */
export function escapeRegex(text) {
    return text.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
}