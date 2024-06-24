import { createRouter, createWebHistory } from 'vue-router';
import mainPage from '@/components/mainPage.vue';
import singleTaskPage from '../components/singleTaskPage.vue';
import addNewTaskPage from '../components/addNewTask.vue'

const routes = [
    {
        path: '/',
        name: 'mainPage',
        component: mainPage,
    },
    {
        path: '/task/:id',
        name: 'singlePage',
        component: singleTaskPage,
    },
    {
        path:'/addNew',
        name:'newTaskPage',
        component: addNewTaskPage
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;