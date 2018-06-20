import Content from '../components/Content/Content';
import Download from '../components/Download/Download';
import Cabinet from '../components/Cabinet/Cabinet';
import Request from '../components/Request/Request';
import SignUp from '../components/SignUp/SignUp';
import UserPage from '../components/UserPage/UserPage';
import NotFoundPage from '../components/404/404';

export default [
    {
        path: '/',
        exact: true,
        component: Content
    },
    {
        path: '/cabinet',
        component: Cabinet
    },
    {
        path: '/request',
        component: Request
    },
    {
        path: '/download',
        component: Download
    },
    {
        path: '/sign-up',
        component: SignUp
    },
    {
        path: '/user/:id',
        component: UserPage
    },
    {
        path: '/*',
        component: NotFoundPage
    },
]