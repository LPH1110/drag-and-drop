import { Tasks, TaskDetail, Home, Overview } from '~/pages';
import { DefaultLayout } from '~/layouts';
import { v4 as uuidv4 } from 'uuid';

const publicRoutes = [
    { id: uuidv4(), path: '/', component: Home, layout: DefaultLayout },
    { id: uuidv4(), path: '/task', component: TaskDetail, layout: DefaultLayout },
    { id: uuidv4(), path: '/tasks', component: Tasks, layout: DefaultLayout },
    { id: uuidv4(), path: '/overview', component: Overview, layout: DefaultLayout },
];

export { publicRoutes };
