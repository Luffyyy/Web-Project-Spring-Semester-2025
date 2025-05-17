import clientPromise from "@/lib/mongodb";

/**
 * This simple function saves you from needing to write these two verbose lines
 * I used typescript here so the type gets saved, this should help our developer experience
 * 
 * @param name The name of the collection you wish to fetch
 */
export default async function getMongoCollection(name: string) {
    const client = await clientPromise;
    return client.db("nextfit").collection(name);
}