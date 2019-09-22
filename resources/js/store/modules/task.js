export default {
    actions: {
        async fetchTasks({commit, getters, dispatch}, {route, limit = 15}) {
            let url = `/api${route}` + (limit ? `?limit=${limit}` : "");

            axios
                .get(url)
                .then((response) => {
                    commit("setTasks", response.data);
                })
                .catch((error) => {
                    console.log(url);

                    console.log(error);
                });
        }
    },
    mutations: {
        createTask(state, newTask) {
            state.tasks.unshift(newTask);
        },
        setTasks(state, tasks) {
            state.tasks = tasks;
        }
    },
    state: {
        tasks: []
    },
    getters: {
        /*validPosts(state) {
            return state.posts.filter(p => {
                return p.title.trim() && p.body.trim()
            });
        },*/
        getTasks(state) {
            return state.tasks;
        },
        /*postsCount(state, getters) {
            return getters.validPosts.length;
        }*/
    },
}
