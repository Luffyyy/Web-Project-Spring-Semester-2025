import ErrorPage from './error-page';
 
export default function NotFound() {
    return ErrorPage({ status: 404, message: 'Could not find requested resource' })
}