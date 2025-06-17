import ErrorPage from './error-page';
 
export default function notLoggedIn() {
    return ErrorPage({ status: 401, message: 'You must be logged in to be in this page' });
}