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
        },
        async addGroup({commit, getters, dispatch}, title) {
            return new Promise(function(resolve, reject) {
                axios
                    .post("/api/groups", {
                        "title": title
                    })
                    .then((response) => {
                        if (response.data.result) {
                            commit("addGroup", response.data);
                        } else {
                            commit("addGroup", {
                                result : false,
                                errors : response.data.errors
                            });
                        }
                        resolve();
                    })
                    .catch((error) => {
                        commit("addGroup", {
                            result : false,
                            errors : [error]
                        });
                        reject();
                    });
            });
        },
        deleteGroup({commit, getters, dispatch}, id) {
            return new Promise((resolve, reject) => {
                axios
                    .delete(`/api/groups/${id}`, {
                        "id": id
                    })
                    .then((response) => {
                        if (response.data.result) {
                            commit("deleteGroup", id);
                        }
                        resolve();
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        }
    },
    mutations: {
        setGroups(state, groups) {
            state.groups = groups;
        },
        addGroup(state, response) {
            state.newGroup = {
                result : response.result,
                errors : response.errors || []
            };

            if (typeof response.group !== "undefined") {
                state.groups.push(response.group);
            }
        },
        deleteGroup(state, id) {
            state.groups.forEach((item, index) => {
               if (item.id === id) {
                   state.groups.splice(index, 1);
               }
            });
        }
    },
    state: {
        newGroup : {},
        groups: []
    },
    getters: {
        getGroups(state) {
            return state.groups;
        },
        newGroup(state) {
            return state.newGroup;
        }
    },
}
