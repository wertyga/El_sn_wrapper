import Content from '../components/Content/Content';
import Download from '../components/Download/Download';
// import Cabinet from '../components/Cabinet/Cabinet';
import Request from '../components/Request/Request';
// import SignUp from '../components/SignUp/SignUp';
// import UserPage from '../components/UserPage/UserPage';
import Credentials from '../components/Credentials/Credentials';
import Email from '../components/Email/Email';
import NotFoundPage from '../components/404/404';

export default [
    {
        path: '/',
        exact: true,
        component: Content
    },
    // {
    //     path: '/cabinet',
    //     component: Cabinet
    // },
    {
        path: '/request',
        component: Request
    },
    {
        path: '/download',
        component: Download
    },
    // {
    //     path: '/sign-up',
    //     component: SignUp
    // },
    {
        path: '/credentials',
        component: Credentials
    },
    {
        path: '/email/unsubscribing/:userID/:emailToken',
        component: Email
    },
    // {
    //     path: '/user/:id',
    //     component: UserPage
    // },
    {
        path: '/*',
        component: NotFoundPage
    },
]