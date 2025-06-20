import { getMongoCollection } from "@/lib/server-utils";
import ResetPasswordForm from "./reset-form";
export default async function ResetPasswordToken({ params }) {
    const { token } = await params;
    const users = await getMongoCollection('users');
    const user = await users.findOne({ reset_token: token, reset_token_expire: { $gte: new Date() } });
    if (!user) {
        return 'Token is invalid!';
    }

    return <ResetPasswordForm token={token} email={user.email}/>
}