import { createLoader, parseAsArrayOf, parseAsString } from 'nuqs/server';
import { findFavoriteExercises } from '../actions';
import FavoriteExercises from './favorite-exercises';
import { getUser } from '@/lib/server-utils';

export default async function favoriteExercisesPage({ searchParams }) {
    const user = await getUser()
    const { query, difficulty, tags } = await createLoader({
        query: parseAsString,
        difficulty: parseAsString,
        tags: parseAsArrayOf(parseAsString)
    })(searchParams);
    if (!user) {
        return <div className="content">
            <strong className="text-3xl">You must be logged in to view your favorites.</strong>
        </div>;
    }
    const exercises = await findFavoriteExercises(query, difficulty, tags);
    if (!exercises || exercises.length === 0) {
        return <div className="content">
            <strong className="text-3xl">No favorite exercises found.</strong>
        </div>;
    }
    return <FavoriteExercises exercises={exercises} />;
}