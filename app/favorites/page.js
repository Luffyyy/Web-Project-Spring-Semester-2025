import { createLoader, parseAsArrayOf, parseAsString } from 'nuqs/server';
import { findFavoriteExercises } from '../actions';
import { getUser } from '@/lib/server-utils';
import ErrorPage from '../error-page';
import FavoritesClient from './favorites-client';

export default async function favoriteExercisesPage({ searchParams }) {
    const user = await getUser()
    const { query, difficulty, tags } = await createLoader({
        query: parseAsString,
        difficulty: parseAsString,
        tags: parseAsArrayOf(parseAsString)
    })(searchParams);
    if (!user) {
        return ErrorPage({ status: 403, message: 'You must be logged in to view your favorites.' });
    }
    const exercises = await findFavoriteExercises(query, difficulty, tags);
    return <FavoritesClient exercises={exercises} />;
}