import VueRouter from "vue-router";
import TasksComponent from "./components/TasksComponent";
import TaskDetailComponent from "./components/TaskDetailComponent";
import GroupComponent from "./components/GroupComponent";
import PriorityComponent from "./components/PriorityComponent";
import Error404Component from "./components/Error404Component";

const routes = [
    {
        name: "tasks",
        path: '/tasks',
        component: TasksComponent,
        children: [
            {
                name: "tasks-all",
                path: "all",
                component: TasksComponent,
                props: (route) => ({ type:  'all' })
            },
            {
                name: "tasks-past-due",
                path: "past-due",
                component: TasksComponent,
                props: (route) => ({ type:  'past-due' })
            },
            {
                name: "tasks-today",
                path: "today",
                component: TasksComponent,
                props: (route) => ({ type:  'today' })
            },
            {
                name: "tasks-yesterday",
                path: "yesterday",
                component: TasksComponent,
                props: (route) => ({ type:  'yesterday' })
            },
            {
                name: "tasks-last-7-days",
                path: "last-7-days",
                component: TasksComponent,
                props: (route) => ({ type:  'last-7-days' })
            }
        ]
    },
    {
        name: "task",
        path: '/task/:id',
        component: TaskDetailComponent,
    },
    {
        name: "groups",
        path: '/groups',
        component: GroupComponent,
        children: [
            {
                name: "group",
                path: ":group",
                component: GroupComponent,
            }
        ]
    },
    {
        name: "priority",
        path: '/priority/:priority',
        component: PriorityComponent
    },
    {
        path: '*',
        component: Error404Component
    }
];

const router = new VueRouter({
    routes,
    mode: "history"
});

export default router;
