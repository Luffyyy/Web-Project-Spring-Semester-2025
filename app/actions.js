'use server'

import clientPromise from "@/lib/mongodb";
import { cookies } from "next/headers";
 
export async function login(username, password) {
    const client = await clientPromise;
    const db = client.db("nextfit");
    const users = db.collection("users");
    const cookieStore = await cookies();
    
    const data = await users.findOne({username, password});
    if (data) { // Because the ID is a special type and causes issues on server
        data._id = data._id.toString();
    }

    // If the user is found let's save their ID in cookies so they don't need to relogin
    // In reality this is bad and not secure at all, you should use secure tokens! But since we didn't learn that yet ;)
    if (data) {
        // Set the cookie to expire after like a month
        cookieStore.set('user', data._id, { maxAge: 60 * 60 * 24 * 30});
    }

    return data;
}

export async function register(username, email, password, dob) {
    const client = await clientPromise;
    const db = client.db("nextfit");
    const users = db.collection("users");

    if (users.findOne({ $or: [{ username }, { email }] })) {
        return {
            error: 'User with this username or email already exists!'
        }
    }

    const res = await users.insertOne({
        username,
        email,
        password,
        dob
    });

    // IF registration succeeded, login the user
    if (res.acknowledged) {
        return {
            user: login(username, password)
        }
    } else {
        return {
            error: 'Failed to create user!'
        }
    }
}