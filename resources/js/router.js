import VueRouter from "vue-router";
import TasksComponent from "./components/TasksComponent";

const routes = [
    {
        name: "tasks-all",
        path: '/tasks/all',
        component: TasksComponent
    },
    {
        name: "tasks-today",
        path: '/tasks/today',
        component: TasksComponent
    },
    {
        name: "tasks-yesterday",
        path: '/tasks/yesterday',
        component: TasksComponent
    },
    {
        name: "tasks-last-7-days",
        path: '/tasks/last-7-days',
        component: TasksComponent
    }
];

const router = new VueRouter({
    routes,
    mode: "history"
});

export default router;
