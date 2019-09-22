import VueRouter from "vue-router";
import TasksComponent from "./components/TasksComponent";
import GroupComponent from "./components/GroupComponent";

const routes = [
    {
        name: "tasks-all",
        path: '/tasks/all',
        component: TasksComponent,
        props: (route) => ({ type:  'all' })
    },
    {
        name: "tasks-past-due",
        path: '/tasks/past-due',
        component: TasksComponent,
        props: (route) => ({ type:  'past-due' })
    },
    {
        name: "tasks-today",
        path: '/tasks/today',
        component: TasksComponent,
        props: (route) => ({ type:  'today' })
    },
    {
        name: "tasks-yesterday",
        path: '/tasks/yesterday',
        component: TasksComponent,
        props: (route) => ({ type:  'yesterday' })
    },
    {
        name: "tasks-last-7-days",
        path: '/tasks/last-7-days',
        component: TasksComponent,
        props: (route) => ({ type:  'last-7-days' })
    },
    {
        name: "groups",
        path: '/groups/:group',
        component: GroupComponent
    }
];

const router = new VueRouter({
    routes,
    mode: "history"
});

export default router;
