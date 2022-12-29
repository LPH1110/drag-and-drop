import { ForgotPassword, Signin, Signup, Workspaces, BoardDetail, Home, Overview, Inbox, Meeting, Issues, Pricing } from '~/pages';
import { DefaultLayout, WrapperLayout, HomeLayout } from '~/layouts';
import { v4 as uuidv4 } from 'uuid';

const publicRoutes = [
    { id: uuidv4(), path: '/', component: Home, layout: HomeLayout },
    { id: uuidv4(), path: '/board/:id', component: BoardDetail, layout: DefaultLayout },
    { id: uuidv4(), path: '/workspaces', component: Workspaces, layout: DefaultLayout },
    { id: uuidv4(), path: '/overview', component: Overview, layout: DefaultLayout },
    { id: uuidv4(), path: '/inbox', component: Inbox, layout: DefaultLayout },
    { id: uuidv4(), path: '/meeting', component: Meeting, layout: DefaultLayout },
    { id: uuidv4(), path: '/issues', component: Issues, layout: DefaultLayout },
    { id: uuidv4(), path: '/pricing', component: Pricing, layout: HomeLayout },
    { id: uuidv4(), path: '/signin', component: Signin, layout: WrapperLayout },
    { id: uuidv4(), path: '/signup', component: Signup, layout: WrapperLayout },
    { id: uuidv4(), path: '/forgot-password', component: ForgotPassword, layout: WrapperLayout },
];

export { publicRoutes };
