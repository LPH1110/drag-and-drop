import { Workspaces, BoardDetail, Home, Overview, Inbox, Meeting, Issues } from '~/pages';
import { DefaultLayout } from '~/layouts';
import { v4 as uuidv4 } from 'uuid';

const publicRoutes = [
    { id: uuidv4(), path: '/', component: Home, layout: DefaultLayout },
    { id: uuidv4(), path: '/board/:id', component: BoardDetail, layout: DefaultLayout },
    { id: uuidv4(), path: '/workspaces', component: Workspaces, layout: DefaultLayout },
    { id: uuidv4(), path: '/overview', component: Overview, layout: DefaultLayout },
    { id: uuidv4(), path: '/inbox', component: Inbox, layout: DefaultLayout },
    { id: uuidv4(), path: '/meeting', component: Meeting, layout: DefaultLayout },
    { id: uuidv4(), path: '/issues', component: Issues, layout: DefaultLayout },
];

export { publicRoutes };
