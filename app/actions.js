'use server'
import { ObjectId } from "mongodb";
import getMongoCollection from "@/lib/getMongoCollection";
import clientPromise from "@/lib/mongodb";
import normalizeMongoIds from "@/lib/normalizeMongoIds";
import { escapeRegex} from "@/lib/utils";
import { getUser } from "@/lib/server-utils";
import { createHash, randomBytes } from "crypto";
import { cookies } from "next/headers";
import nodemailer from 'nodemailer';

/**
 * Logs in a user with username and password
 * 
 * @param {string} username 
 * @param {string} password 
 * @returns The logged in user, if valid
 */
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

/**
 * Registers a new user
 * 
 * @param {string} username 
 * @param {string} email 
 * @param {string} password 
 * @param {string} dob 
 * @returns the new user
 */
export async function register(username, email, password, dob) {
    const users = await getMongoCollection('users');

    if (await users.findOne({ $or: [{ username }, { email }] })) {
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

/**
 * Changes the password of a user using a token given by the reset password function, their email and the new password
 * 
 * @param {string} token 
 * @param {string} email 
 * @param {string} password 
 * @returns Whether the operation succeeeded
 */
export async function changePassword(token, email, password) {
    const users = await getMongoCollection('users');
    const user = await users.findOne({ reset_token: token, email, reset_token_expire: { $gte: new Date() } });
    if (user) {
        await users.updateOne({ email }, {
            $set: {
                password,
                reset_token: null,
                reset_token_expire: null
            }
        });
        return true;
    }

    return false;
}

/**
 * Attempts to send a password reset link to the given email
 * If no user exists with said email, we just silently fail;
 * to not give the user any info they are not supposed to know.
 * 
 * @param {string} email Email to send the password reset to
 */
export async function sendPasswordReset(email) {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "braudewebproject2025@gmail.com",
            pass: process.env.GMAIL_APP_PASS
        }
    });

    const users = await getMongoCollection('users');
    
    const user = await users.findOne({ email });
    if (user) {
        const token = createHash('sha256').update(randomBytes(32).toString('hex')).digest('hex');
        await users.updateOne({ email }, {
            $set: {
                reset_token: token,
                reset_token_expire: new Date(Date.now() + 15*60*1000)
            }
        });
        
        const url = process.env.SITE_URL;

        await transporter.sendMail({
            from: 'braudewebproject2025@gmail.com',
            to: user.email,
            subject: 'Password Reset',
            text: `You've requested a password reset, reset your password through this link: http://${url}/reset-password/${token}`
        });
   } else {
        console.log('found no user with email: ' + email);
   }
}

/**
 * Looks for exercises with query, difficulty and set of tags it must contain
 * 
 * @param {string} query query for title or description
 * @param {'any'|'beginner'|'intermediate'|'advanced'} difficulty 
 * @param {string[]} tags
 * @returns array of exercises
 */
export async function findExercises(query, difficulty, tags, filter = {}) {
    const exercises = await getMongoCollection('exercises');

    if (tags && tags.length > 0) {
        filter.tags = { $all: tags };
    }
    if (query) {
        filter.title = { $regex: escapeRegex(query), $options: 'i' };
    }
    if (difficulty && difficulty != 'any') {
        filter.difficulty = difficulty;
    }

    return normalizeMongoIds(await exercises.find(filter).toArray());
}
export async function addToFavorites(exerciseId) {
    const users = await getMongoCollection('users');
    const user = await getUser();
    if (!userId) {
        throw new Error('User not logged in');
    }

    // Add the exercise to the user's favorites
    const result = await users.updateOne(
         { _id: new ObjectId(user._id) },
        { $addToSet: { favorites: exerciseId } }
    );

    return result.modifiedCount > 0; // Return true if the operation was successful
}
export async function findFavoriteExercises(query, difficulty, tags) {
    const user = await getUser();   

    if (!user || !user.favorites) {
        return [];
    }

    return findExercises(query, difficulty, tags, {
        _id: { $in: user.favorites.map(id => new ObjectId(String(id))) }
    });
}