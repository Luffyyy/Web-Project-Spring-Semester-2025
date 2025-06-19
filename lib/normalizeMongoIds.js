/**
 * This fixes mongodb arrays that contain the problematic _id
 * _id is a BSON object, next doesn't like it when you pass it from server to client
 * All this does is go through each object in the array and convert the _ids into a string
 */
export default function normalizeMongoIds(arr) {
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
