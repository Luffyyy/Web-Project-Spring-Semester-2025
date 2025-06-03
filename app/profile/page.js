import { currentUser } from '../actions';
import ProfileClient from './profile-client';

export default async function ProfilePage() {
  const user = await currentUser();
  return <ProfileClient user={user} />;
}