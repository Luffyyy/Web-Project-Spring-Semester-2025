import { currentUser } from '../actions';
import notLoggedIn from '../not-logged-in';
import ProfileClient from './profile-client';

export default async function ProfilePage() {
    const user = await currentUser();

    if (!user) {
        return notLoggedIn();
    }

    return <ProfileClient user={user} />;
}