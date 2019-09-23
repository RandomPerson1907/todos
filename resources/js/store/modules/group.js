export default {
    actions: {
        async fetchGroups({commit, getters, dispatch}, {route, limit = 15}) {
            let url = `/api${route}`;

            axios
                .get(url)
                .then((response) => {
                    commit("setGroups", response.data);
                })
                .catch((error) => {
                    console.log(url);

                    console.log(error);
                });
        }
    },
    mutations: {
        setGroups(state, groups) {
            state.groups = groups;
        }
    },
    state: {
        groups: []
    },
    getters: {
        getGroups(state) {
            return state.groups;
        },
    },
}
