import Vue from 'vue';
import Vuex from 'vuex';
import task from "./modules/task";
import group from "./modules/group";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        task,
        group
    }
});

export default store;
